import React, { Component } from 'react';
import * as THREE from 'three';
import { SpaceFrameData } from '../../types';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getAverageNodePosition, getAnimatedPosition } from './utils';

interface TrussVisualizationProps {
  spaceFrameData: SpaceFrameData;
  deformedSpaceFrameData?: SpaceFrameData;
}

class TrussVisualization extends Component<TrussVisualizationProps> {
  private myRef: any;
  componentDidMount() {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.myRef.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1, // near
      1000 // far
    );
    camera.position.set(65, 8, -10);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', this.render);
    controls.minDistance = 1;
    controls.maxDistance = 500;
    controls.enablePan = false;
    const center = getAverageNodePosition(this.props.spaceFrameData);
    controls.target.set(center.x, center.y, center.z);
    console.log('center: ', center);

    const ambient = new THREE.AmbientLight(0xffffff, 0.01);
    scene.add(ambient);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
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
      const nodeGeometry = new THREE.SphereGeometry(radius, 32, 32);
      const nodeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
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
      const structVector = new THREE.Curve<Vector3>();
      structVector.getPoint = (t: number) =>
        new THREE.Vector3(
          sourceX + t * (targetX - sourceX),
          sourceY + t * (targetY - sourceY),
          sourceZ + t * (targetZ - sourceZ)
        );

      const strutGeometry = new THREE.TubeGeometry(
        structVector, // path
        1, // tubularSegments
        radius, // radius
        32 // radiusSegments
      );
      const strutMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
      });
      const strutMesh = new THREE.Mesh(strutGeometry, strutMaterial);
      strutMesh.castShadow = true; //default is false
      strutMesh.receiveShadow = false; //default
      strutMeshes[id] = strutMesh;
      scene.add(strutMesh);
    });

    //Create a plane that receives shadows (but does not cast them)
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0x808080,
      dithering: true,
    });

    const planeGeometry = new THREE.PlaneBufferGeometry(2000, 2000);

    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
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
          const structVector = new THREE.Curve<Vector3>();
          structVector.getPoint = (t: number) =>
            new THREE.Vector3(
              newSourceX + t * (newTargetX - newSourceX),
              newSourceY + t * (newTargetY - newSourceY),
              newSourceZ + t * (newTargetZ - newSourceZ)
            );
          strutMeshes[id].geometry = new THREE.TubeGeometry(
            structVector, // path
            1, // tubularSegments
            radius, // radius
            32 // radiusSegments
          );
        });
        renderer.render(scene, camera);
      };
      animate();
    }
  }
  render() {
    return <div ref={ref => (this.myRef = ref)} />;
  }
}

export default TrussVisualization;
