import React, { Component } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getAverageNodePosition, getAnimatedPosition } from './utils';
import ResourceTracker from './ResourceTracker';
import Structure from '../../models/structure/Structure';

interface SpaceFrameVisualizationProps {
  spaceFrameData: Structure;
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
  constructor(props: any) {
    super(props);
    this.nodeMeshes = {};
    this.strutMeshes = {};
  }

  componentDidMount() {
    this.resourceTracker = new ResourceTracker();
    const renderer = this.resourceTracker.track(
      new THREE.WebGLRenderer({
        antialias: true,
      })
    );
    this.renderer = renderer;
    const width = this.width || window.innerWidth;
    const height = this.height || window.innerHeight;
    renderer.setSize(width, height);
    this.myRef.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    this.scene = this.resourceTracker.track(new THREE.Scene());

    this.camera = this.resourceTracker.track(
      new THREE.PerspectiveCamera(
        35,
        width / height,
        1, // near
        1000 // far
      )
    );
    this.initializeCamera();

    const controls = this.resourceTracker.track(
      new OrbitControls(this.camera!, renderer.domElement)
    );
    this.controls = controls;
    controls.addEventListener('change', this.render);
    controls.minDistance = 1;
    controls.maxDistance = 500;
    controls.enablePan = false;
    const center = getAverageNodePosition(this.props.spaceFrameData);
    controls.target.set(center.x, center.y, center.z);

    const ambient = this.resourceTracker.track(
      new THREE.AmbientLight(0xffffff, 0.01)
    );
    this.scene!.add(ambient);

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

    // This is where we start creating the actual space frame
    const { nodes, struts } = this.props.spaceFrameData;
    nodes.forEach(node => {
      const { x, y, z, id } = node;
      const strutsConnectedToNode = struts
        .filter(({ sourceId, targetId }) => [sourceId, targetId].includes(id))
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

    struts.forEach(({ id, radius, sourceId, targetId }) => {
      const sourceNode = nodes.find(({ id }) => id === sourceId);
      const targetNode = nodes.find(({ id }) => id === targetId);
      if (!sourceNode || !targetNode) return;
      const { x: sourceX, y: sourceY, z: sourceZ } = sourceNode;
      const { x: targetX, y: targetY, z: targetZ } = targetNode;
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
    const maxRadius = Math.max(...struts.map(({ radius }) => radius), 0);
    planeMesh.position.set(0, -maxRadius, 0);
    planeMesh.rotation.x = -Math.PI * 0.5;
    planeMesh.receiveShadow = true;
    this.scene!.add(planeMesh);

    if (this.props.editMode) {
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
            this.scene!.add(nodeMesh);
          }
        }
      }
    }
    this.animate();
  }

  initializeCamera = () => {
    this.camera!.position.set(65, 8, -10);
  };

  animate = () => {
    if (!this.props.deformedSpaceFrameData) {
      this.animationFrame = requestAnimationFrame(this.animate);
      this.renderer!.render(this.scene!, this.camera!);
      return;
    }
    // If this.props.deformedSpaceFrameData
    const { nodes, struts } = this.props.spaceFrameData;
    const { nodes: deformedNodes } = this.props.deformedSpaceFrameData;
    const animationFrame = requestAnimationFrame(this.animate);
    this.animationFrame = animationFrame;
    nodes.forEach(({ id, x, y, z }) => {
      const deformedNode = deformedNodes.find(
        ({ id: deformedId }) => deformedId === id
      );
      if (!deformedNode) return;
      const { x: deformedX, y: deformedY, z: deformedZ } = deformedNode;
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
    struts.forEach(({ id, radius, sourceId, targetId }) => {
      const sourceNode = nodes.find(({ id }) => id === sourceId);
      const targetNode = nodes.find(({ id }) => id === targetId);
      const deformedSourceNode = deformedNodes.find(
        ({ id }) => id === sourceId
      );
      const deformedTargetNode = deformedNodes.find(
        ({ id }) => id === targetId
      );
      if (
        !sourceNode ||
        !targetNode ||
        !deformedSourceNode ||
        !deformedTargetNode
      )
        return;
      const newSourceX = getAnimatedPosition(
        sourceNode.x,
        deformedSourceNode.x,
        animationFrame
      );
      const newSourceY = getAnimatedPosition(
        sourceNode.y,
        deformedSourceNode.y,
        animationFrame
      );
      const newSourceZ = getAnimatedPosition(
        sourceNode.z,
        deformedSourceNode.z,
        animationFrame
      );
      const newTargetX = getAnimatedPosition(
        targetNode.x,
        deformedTargetNode.x,
        animationFrame
      );
      const newTargetY = getAnimatedPosition(
        targetNode.y,
        deformedTargetNode.y,
        animationFrame
      );
      const newTargetZ = getAnimatedPosition(
        targetNode.z,
        deformedTargetNode.z,
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

  shouldComponentUpdate({
    spaceFrameData,
    editMode,
  }: SpaceFrameVisualizationProps) {
    console.log(
      'shouldComponentUpdate: ',
      spaceFrameData.id !== this.props.spaceFrameData.id ||
        editMode !== this.props.editMode
    );
    return (
      spaceFrameData.id !== this.props.spaceFrameData.id ||
      editMode !== this.props.editMode
    );
  }

  componentWillUnmount() {
    if (this.myRef && this.renderer) {
      this.myRef.removeChild(this.renderer.domElement);
    }
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
    }
    this.resourceTracker.dispose();
  }

  render() {
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
  }
}

export default SpaceFrameVisualization;
