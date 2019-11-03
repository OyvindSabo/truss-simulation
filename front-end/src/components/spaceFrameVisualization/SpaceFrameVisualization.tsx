import React, { Component } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getAverageNodePosition, getAnimatedPosition } from './utils';
import ResourceTracker from './ResourceTracker';
import Structure from '../../models/structure/Structure';
import {
  STRUCTURE_COLOR,
  HIGHLIGHTED_STRUCTURE_COLOR,
  SELECTED_STRUCTURE_COLOR,
} from '../../constants/config/colors';
import Node from '../../models/node/Node';
import Strut from '../../models/strut/Strut';

interface SpaceFrameVisualizationProps {
  structure: Structure;
  deformedSpaceFrameData?: Structure;
  editMode?: boolean;
  baseUnit?: number;
}

class SpaceFrameVisualization extends Component<SpaceFrameVisualizationProps> {
  private myRef: any;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  renderer?: THREE.WebGLRenderer;
  scene?: THREE.Scene;
  camera?: THREE.PerspectiveCamera;
  controls?: OrbitControls;
  raycaster?: THREE.Raycaster;
  mouse?: THREE.Vector2;
  animationFrame?: number;
  resourceTracker?: any;
  planeMesh: THREE.Mesh | null;
  nodeMeshes: { [key: string]: THREE.Mesh };
  strutMeshes: { [key: string]: THREE.Mesh };
  threeObjectIdToStrutureElement: { [key: string]: Node | Strut };
  highlightedObject: THREE.Mesh | null;
  selectedObjects: THREE.Mesh[];
  helperMeshes: THREE.Mesh[];
  constructor(props: any) {
    super(props);
    this.planeMesh = null;
    this.nodeMeshes = {};
    this.strutMeshes = {};
    this.threeObjectIdToStrutureElement = {};
    this.highlightedObject = null;
    this.selectedObjects = [];
    this.helperMeshes = [];
  }

  componentDidMount() {
    this.initializeResourceTracker();
    this.initializeRenderer();
    this.initializeScene();
    this.initializeAmbientLight();
    this.initializeSpotlight();
    this.initializeCamera();
    this.initializeControls();
    this.initializePlane();
    this.initializePicking();
    this.renderStructure();
    this.props.structure.nodes.addChangeListener(() => {
      this.renderStructure();
    });
    this.props.structure.struts.addChangeListener(() => {
      this.renderStructure();
    });
    this.animate();
  }

  initializeResourceTracker = () => {
    this.resourceTracker = new ResourceTracker();
  };

  initializeRenderer = () => {
    this.renderer = this.resourceTracker.track(
      new THREE.WebGLRenderer({
        antialias: true,
      })
    );
    const width = this.width || window.innerWidth;
    const height = this.height || window.innerHeight;
    this.renderer!.setSize(width, height);
    this.myRef.appendChild(this.renderer!.domElement);
    this.renderer!.shadowMap.enabled = true;
    this.renderer!.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    this.renderer!.gammaInput = true;
    this.renderer!.gammaOutput = true;
  };

  initializeScene = () => {
    this.scene = this.resourceTracker.track(new THREE.Scene());
  };

  initializeAmbientLight = () => {
    const ambient = this.resourceTracker.track(
      new THREE.AmbientLight(0xffffff, 0.01)
    );
    this.scene!.add(ambient);
  };

  initializeSpotlight = () => {
    const spotLight = this.resourceTracker.track(
      new THREE.SpotLight(0xffffff, 1)
    );
    spotLight.position.set(15, 40, 35);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.05;
    spotLight.decay = 2;
    spotLight.distance = 200;
    spotLight.castShadow = true;
    // The mapSize has to be this big for the shadows to not look pixelated
    spotLight.shadow.mapSize.width = 10000;
    spotLight.shadow.mapSize.height = 10000;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 1000;
    this.scene!.add(spotLight);
  };

  initializeCamera = () => {
    const width = this.width || window.innerWidth;
    const height = this.height || window.innerHeight;
    this.camera = this.resourceTracker.track(
      new THREE.PerspectiveCamera(
        35,
        width / height,
        1, // near
        1000 // far
      )
    );
    this.camera!.position.set(65, 8, -10);
  };

  initializeControls = () => {
    this.controls = this.resourceTracker.track(
      new OrbitControls(this.camera!, this.renderer!.domElement)
    );
    this.controls!.addEventListener('change', this.render);
    this.controls!.minDistance = 1;
    this.controls!.maxDistance = 500;
    this.controls!.enablePan = false;
    const center = getAverageNodePosition(this.props.structure);
    this.controls!.target.set(center.x, center.y, center.z);
  };

  initializePlane = () => {
    const planeGeometry = this.resourceTracker.track(
      new THREE.PlaneBufferGeometry(2000, 2000)
    );
    //Create a plane that receives shadows (but does not cast them)
    const planeMaterial = this.resourceTracker.track(
      new THREE.MeshPhongMaterial({
        color: 0x808080,
        dithering: true,
      })
    );

    const planeMesh = this.resourceTracker.track(
      new THREE.Mesh(planeGeometry, planeMaterial)
    );
    this.planeMesh = planeMesh;

    // Lower the floor plane enough to avoid the radius of the struts causing
    // intersection with the ground.
    const maxRadius = Math.max(
      ...this.props.structure.struts.get().map(({ radius }) => radius),
      0
    );
    planeMesh.position.set(0, -maxRadius, 0);
    planeMesh.rotation.x = -Math.PI * 0.5;
    planeMesh.receiveShadow = true;
    this.scene!.add(planeMesh);
  };

  getMousePixelX = (event: MouseEvent) => {
    const containerLeft = this.left || 0;
    const mousePixelX = event.clientX - containerLeft;
    return mousePixelX;
  };

  getMousePixelY = (event: MouseEvent) => {
    const containerTop = this.top || 0;
    const mousePixelY = event.clientY - containerTop;
    return mousePixelY;
  };

  onMouseMove = (event: MouseEvent) => {
    if (!this.mouse) return;
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    const containerWidth = this.width || window.innerWidth;
    const containerHeight = this.height || window.innerHeight;

    this.mouse.x = (this.getMousePixelX(event) / containerWidth) * 2 - 1;
    this.mouse.y = -(this.getMousePixelY(event) / containerHeight) * 2 + 1;
  };

  onClick = () => {
    if (this.highlightedObject) {
      if (this.selectedObjects.includes(this.highlightedObject)) {
        this.selectedObjects = this.selectedObjects.filter(
          object => object !== this.highlightedObject
        );
      } else {
        this.selectedObjects.push(this.highlightedObject);
      }
      const selectedNodes = this.selectedObjects
        .map(({ id }) => this.getStructureElementFromThreeObjectId(id))
        .filter(strutOrNode => strutOrNode instanceof Node) as Node[];

      if (selectedNodes.length === 2) {
        const [source, target] = selectedNodes;
        this.props.structure.struts.add(new Strut({ source, target }));
        this.selectedObjects = [];
      }
    }
  };

  initializePicking = () => {
    this.raycaster = this.resourceTracker.track(new THREE.Raycaster());
    this.mouse = this.resourceTracker.track(new THREE.Vector2());
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('click', this.onClick, false);
  };

  renderStructure = () => {
    const { nodes, struts } = this.props.structure;
    nodes.get().forEach(node => {
      const { id } = node;
      const { x, y, z } = node.coordinates.get();
      const strutsConnectedToNode = struts
        .get()
        .filter(({ source, target }) => [source, target].includes(node))
        .map(({ radius }) => radius);

      const baseUnit = this.props.baseUnit || 1;
      const radius = this.props.editMode
        ? baseUnit / 20
        : Math.max(...strutsConnectedToNode, 0);
      const nodeGeometry = this.resourceTracker.track(
        new THREE.SphereGeometry(radius, 32, 32)
      );
      if (this.nodeMeshes[id]) {
        this.nodeMeshes[id].geometry = nodeGeometry;
      } else {
        const nodeMaterial = this.resourceTracker.track(
          new THREE.MeshStandardMaterial({ color: STRUCTURE_COLOR })
        );
        const nodeMesh = this.resourceTracker.track(
          new THREE.Mesh(nodeGeometry, nodeMaterial)
        );
        this.threeObjectIdToStrutureElement[nodeMesh.id] = node;
        nodeMesh.position.set(x, y, z);
        this.nodeMeshes[id] = nodeMesh;
        this.scene!.add(nodeMesh);
      }
    });

    struts.get().forEach(strut => {
      const { id, radius, source, target } = strut;
      const { x: sourceX, y: sourceY, z: sourceZ } = source.coordinates.get();
      const { x: targetX, y: targetY, z: targetZ } = target.coordinates.get();
      const structVector = this.resourceTracker.track(
        new THREE.Curve<Vector3>()
      );
      structVector.getPoint = (t: number) =>
        this.resourceTracker.track(
          new THREE.Vector3(
            sourceX + t * (targetX - sourceX),
            sourceY + t * (targetY - sourceY),
            sourceZ + t * (targetZ - sourceZ)
          )
        );

      const strutGeometry = this.resourceTracker.track(
        new THREE.TubeGeometry(
          structVector, // path
          1, // tubularSegments
          radius, // radius
          32 // radiusSegments
        )
      );
      const strutMaterial = this.resourceTracker.track(
        new THREE.MeshStandardMaterial({
          color: STRUCTURE_COLOR,
        })
      );
      const strutMesh = this.resourceTracker.track(
        new THREE.Mesh(strutGeometry, strutMaterial)
      );
      this.threeObjectIdToStrutureElement[strutMesh.id] = strut;
      strutMesh.castShadow = true; //default is false
      strutMesh.receiveShadow = false; //default
      this.strutMeshes[id] = strutMesh;
      this.scene!.add(strutMesh);
    });
  };

  clearStructure = () => {
    this.scene &&
      this.scene.children.forEach(child => {
        child.remove();
      });
  };

  getStructureElementFromThreeObjectId = (id: number) => {
    return this.threeObjectIdToStrutureElement[id];
  };

  /* Not used, but should be replaced with a coordinate system renderer
  initializeHelperSpheres = () => {
    const baseUnit = this.props.baseUnit || 1;
    const radius = baseUnit / 20;
    const nodeGeometry = this.resourceTracker.track(
      new THREE.SphereGeometry(radius, 32, 32)
    );
    const nodeMaterial = this.resourceTracker.track(
      new THREE.MeshStandardMaterial({ color: STRUCTURE_COLOR })
    );
    for (let x = -30; x <= 30; x += baseUnit) {
      for (let y = 0; y <= 30; y += baseUnit) {
        for (let z = -30; z <= 30; z += baseUnit) {
          const nodeMesh = this.resourceTracker.track(
            new THREE.Mesh(nodeGeometry, nodeMaterial)
          );
          nodeMesh.position.set(x, y, z);
          this.helperMeshes.push(nodeMesh);
        }
      }
    }
  };*/

  /* Not used, but should be replaced with a coordinate system renderer
  addHelperSpheres = () => {
    if (!this.helperMeshes.length) {
      this.initializeHelperSpheres();
    }
    this.helperMeshes.forEach(helperMesh => {
      this.scene!.add(helperMesh);
    });
  };*/

  removeHelperSpheres = () => {
    this.helperMeshes.forEach(helperMesh => {
      this.scene!.remove(helperMesh);
    });
  };

  animate = () => {
    if (!this.props.deformedSpaceFrameData) {
      this.animationFrame = requestAnimationFrame(this.animate);

      // update the picking ray with the camera and mouse position
      if (
        !(
          this.raycaster &&
          this.mouse &&
          this.camera &&
          this.scene &&
          this.renderer
        )
      )
        return;

      // This raycaster logic should maybe be moved out to this.onCick and this.onMouseMove
      this.raycaster.setFromCamera(this.mouse, this.camera);
      // calculate objects intersecting the picking ray
      const intersects = this.raycaster.intersectObjects(this.scene.children);

      // Unhighlight previously highlighted objects
      if (this.highlightedObject) {
        (this.highlightedObject.material as any).color.set(STRUCTURE_COLOR);
        this.highlightedObject = null;
      }

      // Highlight hovered objects
      if (intersects.length) {
        const object = intersects[0].object as THREE.Mesh;
        (object.material as any).color.set(HIGHLIGHTED_STRUCTURE_COLOR);
        this.highlightedObject = object;
      }

      // Highlight selected items
      this.selectedObjects.forEach(selectedObject => {
        (selectedObject.material as any).color.set(SELECTED_STRUCTURE_COLOR);
      });

      this.renderer.render(this.scene, this.camera);
      return;
    }
    // If this.props.deformedSpaceFrameData
    const { nodes, struts } = this.props.structure;
    const { nodes: deformedNodes } = this.props.deformedSpaceFrameData;
    const animationFrame = requestAnimationFrame(this.animate);
    this.animationFrame = animationFrame;
    nodes.get().forEach(node => {
      const { id } = node;
      const { x, y, z } = node.coordinates.get();
      const deformedNode = deformedNodes
        .get()
        .find(({ id: deformedId }) => deformedId === id);
      if (!deformedNode) return;
      const {
        x: deformedX,
        y: deformedY,
        z: deformedZ,
      } = deformedNode.coordinates.get();
      this.nodeMeshes[id].position.x = getAnimatedPosition(
        x,
        deformedX,
        animationFrame
      );
      this.nodeMeshes[id].position.y = getAnimatedPosition(
        y,
        deformedY,
        animationFrame
      );
      this.nodeMeshes[id].position.z = getAnimatedPosition(
        z,
        deformedZ,
        animationFrame
      );
    });
    struts.get().forEach(({ id, radius, source, target }) => {
      const deformedSourceNode = deformedNodes
        .get()
        .find(({ id }) => id === source.id);
      const deformedTargetNode = deformedNodes
        .get()
        .find(({ id }) => id === target.id);
      if (!source || !target || !deformedSourceNode || !deformedTargetNode)
        return;
      const newSourceX = getAnimatedPosition(
        source.coordinates.get().x,
        deformedSourceNode.coordinates.get().x,
        animationFrame
      );
      const newSourceY = getAnimatedPosition(
        source.coordinates.get().y,
        deformedSourceNode.coordinates.get().y,
        animationFrame
      );
      const newSourceZ = getAnimatedPosition(
        source.coordinates.get().z,
        deformedSourceNode.coordinates.get().z,
        animationFrame
      );
      const newTargetX = getAnimatedPosition(
        target.coordinates.get().x,
        deformedTargetNode.coordinates.get().x,
        animationFrame
      );
      const newTargetY = getAnimatedPosition(
        target.coordinates.get().y,
        deformedTargetNode.coordinates.get().y,
        animationFrame
      );
      const newTargetZ = getAnimatedPosition(
        target.coordinates.get().z,
        deformedTargetNode.coordinates.get().z,
        animationFrame
      );
      const structVector = this.resourceTracker.track(
        new THREE.Curve<Vector3>()
      );
      structVector.getPoint = (t: number) =>
        this.resourceTracker.track(
          new THREE.Vector3(
            newSourceX + t * (newTargetX - newSourceX),
            newSourceY + t * (newTargetY - newSourceY),
            newSourceZ + t * (newTargetZ - newSourceZ)
          )
        );
      this.strutMeshes[id].geometry = this.resourceTracker.track(
        new THREE.TubeGeometry(
          structVector, // path
          1, // tubularSegments
          radius, // radius
          32 // radiusSegments
        )
      );
    });
    this.renderer!.render(this.scene!, this.camera!);
  };

  componentDidUpdate = (prevProps: SpaceFrameVisualizationProps) => {
    if (this.props !== prevProps) {
      this.renderStructure();
      /*if (this.props.editMode && this.resourceTracker) {
        // We currently o nothing here, but might want to pull out the process
        // of enlarging all nodes in the structure here.
        // In the future, I might also want to render a coordingate system here.
      } else {
        // We currently o nothing here, but might want to pull out the process
        // of making the nodes in the structure match the thickest edge, from
        // renderStructure to here.
      }*/
    }
  };

  componentWillUnmount() {
    if (this.myRef && this.renderer) {
      this.myRef.removeChild(this.renderer.domElement);
    }
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
    }
    this.resourceTracker.dispose();
  }

  render = () => {
    return (
      <div
        ref={ref => {
          this.myRef = ref;
          if (ref) {
            const { height, left, top, width } = ref.getBoundingClientRect();
            this.top = top;
            this.left = left;
            this.width = width;
            this.height = height;
          }
        }}
        style={{ width: '100%', height: '100%' }}
      />
    );
  };
}

export default SpaceFrameVisualization;
