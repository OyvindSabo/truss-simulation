import React, { Component } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getAverageNodePosition, getAnimatedPosition } from './utils';
import ResourceTracker from './ResourceTracker';
import Structure from '../../models/structure/Structure';

interface SpaceFrameVisualizationProps {
  structure: Structure;
  deformedSpaceFrameData?: Structure;
  editMode?: boolean;
  baseUnit?: number;
}

class SpaceFrameVisualization extends Component<SpaceFrameVisualizationProps> {
  private myRef: any;
  width?: number;
  height?: number;
  renderer?: THREE.WebGLRenderer;
  scene?: THREE.Scene;
  camera?: THREE.PerspectiveCamera;
  controls?: OrbitControls;
  animationFrame?: number;
  resourceTracker?: any;
  nodeMeshes: { [key: string]: THREE.Mesh };
  strutMeshes: { [key: string]: THREE.Mesh };
  helperMeshes: THREE.Mesh[];
  constructor(props: any) {
    super(props);
    this.nodeMeshes = {};
    this.strutMeshes = {};
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
    this.initializeHelperSpheres();
    this.renderStructure();
    this.props.structure.nodes.addChangeListener(() => {
      this.renderStructure();
    });
    if (this.props.editMode && this.resourceTracker) {
      this.initializeHelperSpheres();
      this.addHelperSpheres();
    }

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

  renderStructure = () => {
    const { nodes, struts } = this.props.structure;
    nodes.get().forEach(node => {
      const { id } = node;
      const { x, y, z } = node.coordinates.get();
      const strutsConnectedToNode = struts
        .get()
        .filter(({ source, target }) => [source, target].includes(node))
        .map(({ radius }) => radius);
      const radius = Math.max(...strutsConnectedToNode, 0);
      const nodeGeometry = this.resourceTracker.track(
        new THREE.SphereGeometry(radius, 32, 32)
      );
      const nodeMaterial = this.resourceTracker.track(
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      const nodeMesh = this.resourceTracker.track(
        new THREE.Mesh(nodeGeometry, nodeMaterial)
      );
      nodeMesh.position.set(x, y, z);
      this.nodeMeshes[id] = nodeMesh;
      this.scene!.add(nodeMesh);
    });

    struts.get().forEach(({ id, radius, source, target }) => {
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
          color: 0xffffff,
        })
      );
      const strutMesh = this.resourceTracker.track(
        new THREE.Mesh(strutGeometry, strutMaterial)
      );
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

  initializeHelperSpheres = () => {
    const baseUnit = this.props.baseUnit || 1;
    const radius = baseUnit / 20;
    const nodeGeometry = this.resourceTracker.track(
      new THREE.SphereGeometry(radius, 32, 32)
    );
    const nodeMaterial = this.resourceTracker.track(
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    for (let x = -50; x <= 50; x += baseUnit) {
      for (let y = 0; y <= 50; y += baseUnit) {
        for (let z = -50; z <= 50; z += baseUnit) {
          const nodeMesh = this.resourceTracker.track(
            new THREE.Mesh(nodeGeometry, nodeMaterial)
          );
          nodeMesh.position.set(x, y, z);
          this.helperMeshes.push(nodeMesh);
        }
      }
    }
  };

  addHelperSpheres = () => {
    if (!this.helperMeshes.length) {
      this.initializeHelperSpheres();
    }
    this.helperMeshes.forEach(helperMesh => {
      this.scene!.add(helperMesh);
    });
  };

  removeHelperSpheres = () => {
    this.helperMeshes.forEach(helperMesh => {
      this.scene!.remove(helperMesh);
    });
  };

  animate = () => {
    if (!this.props.deformedSpaceFrameData) {
      this.animationFrame = requestAnimationFrame(this.animate);
      this.renderer!.render(this.scene!, this.camera!);
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
      if (this.props.editMode && this.resourceTracker) {
        this.addHelperSpheres();
      } else {
        this.removeHelperSpheres();
      }
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
            const { width, height } = ref.getBoundingClientRect();
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
