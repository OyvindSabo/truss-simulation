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
  controls?: OrbitControls;
  animationFrame?: number;
  resourceTracker?: any;
  componentDidMount() {
    this.resourceTracker = new ResourceTracker();
    const track = this.resourceTracker.track.bind(this.resourceTracker);
    const renderer = track(
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

    const scene = track(new THREE.Scene());
    this.scene = scene;

    const camera = track(
      new THREE.PerspectiveCamera(
        35,
        width / height,
        1, // near
        1000 // far
      )
    );
    camera.position.set(65, 8, -10);

    const controls = track(new OrbitControls(camera, renderer.domElement));
    this.controls = controls;
    controls.addEventListener('change', this.render);
    controls.minDistance = 1;
    controls.maxDistance = 500;
    controls.enablePan = false;
    const center = getAverageNodePosition(this.props.spaceFrameData);
    controls.target.set(center.x, center.y, center.z);

    const ambient = track(new THREE.AmbientLight(0xffffff, 0.01));
    scene.add(ambient);

    const spotLight = track(new THREE.SpotLight(0xffffff, 1));
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
    scene.add(spotLight);

    /*const lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);*/

    /*const shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    scene.add(shadowCameraHelper);*/

    // This is where we start creating the actual space frame
    const nodeMeshes: { [key: string]: THREE.Mesh } = {};
    const { nodes, struts } = this.props.spaceFrameData;
    nodes.forEach(node => {
      const { x, y, z, id } = node;
      const strutsConnectedToNode = struts
        .filter(({ sourceId, targetId }) => [sourceId, targetId].includes(id))
        .map(({ radius }) => radius);
      const radius = Math.max(...strutsConnectedToNode, 0);
      const nodeGeometry = track(new THREE.SphereGeometry(radius, 32, 32));
      const nodeMaterial = track(
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      const nodeMesh = track(new THREE.Mesh(nodeGeometry, nodeMaterial));
      nodeMesh.position.set(x, y, z);
      nodeMeshes[id] = nodeMesh;
      scene.add(nodeMesh);
    });

    const strutMeshes: { [key: string]: THREE.Mesh } = {};
    struts.forEach(({ id, radius, sourceId, targetId }) => {
      const sourceNode = nodes.find(({ id }) => id === sourceId);
      const targetNode = nodes.find(({ id }) => id === targetId);
      if (!sourceNode || !targetNode) return;
      const { x: sourceX, y: sourceY, z: sourceZ } = sourceNode;
      const { x: targetX, y: targetY, z: targetZ } = targetNode;
      const structVector = track(new THREE.Curve<Vector3>());
      structVector.getPoint = (t: number) =>
        track(
          new THREE.Vector3(
            sourceX + t * (targetX - sourceX),
            sourceY + t * (targetY - sourceY),
            sourceZ + t * (targetZ - sourceZ)
          )
        );

      const strutGeometry = track(
        new THREE.TubeGeometry(
          structVector, // path
          1, // tubularSegments
          radius, // radius
          32 // radiusSegments
        )
      );
      const strutMaterial = track(
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
        })
      );
      const strutMesh = track(new THREE.Mesh(strutGeometry, strutMaterial));
      strutMesh.castShadow = true; //default is false
      strutMesh.receiveShadow = false; //default
      strutMeshes[id] = strutMesh;
      scene.add(strutMesh);
    });

    const planeGeometry = track(new THREE.PlaneBufferGeometry(2000, 2000));
    //Create a plane that receives shadows (but does not cast them)
    const planeMaterial = track(
      new THREE.MeshPhongMaterial({
        color: 0x808080,
        dithering: true,
      })
    );

    const planeMesh = track(new THREE.Mesh(planeGeometry, planeMaterial));
    // Lower the floor plane enough to avoid the radius of the struts causing
    // intersection with the ground.
    const maxRadius = Math.max(...struts.map(({ radius }) => radius), 0);
    planeMesh.position.set(0, -maxRadius, 0);
    planeMesh.rotation.x = -Math.PI * 0.5;
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);

    if (this.props.deformedSpaceFrameData) {
      const { nodes: deformedNodes } = this.props.deformedSpaceFrameData;
      const animate = () => {
        const animationFrame = requestAnimationFrame(animate);
        this.animationFrame = animationFrame;
        nodes.forEach(({ id, x, y, z }) => {
          const deformedNode = deformedNodes.find(
            ({ id: deformedId }) => deformedId === id
          );
          if (!deformedNode) return;
          const { x: deformedX, y: deformedY, z: deformedZ } = deformedNode;
          nodeMeshes[id].position.x = getAnimatedPosition(
            x,
            deformedX,
            animationFrame
          );
          nodeMeshes[id].position.y = getAnimatedPosition(
            y,
            deformedY,
            animationFrame
          );
          nodeMeshes[id].position.z = getAnimatedPosition(
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
          const structVector = track(new THREE.Curve<Vector3>());
          structVector.getPoint = (t: number) =>
            track(
              new THREE.Vector3(
                newSourceX + t * (newTargetX - newSourceX),
                newSourceY + t * (newTargetY - newSourceY),
                newSourceZ + t * (newTargetZ - newSourceZ)
              )
            );
          strutMeshes[id].geometry = track(
            track(
              new THREE.TubeGeometry(
                structVector, // path
                1, // tubularSegments
                radius, // radius
                32 // radiusSegments
              )
            )
          );
        });
        renderer.render(scene, camera);
      };
      animate();
    } else {
      const animate = () => {
        this.animationFrame = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    }
  }

  shouldComponentUpdate({
    spaceFrameData,
    editMode,
  }: SpaceFrameVisualizationProps) {
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
