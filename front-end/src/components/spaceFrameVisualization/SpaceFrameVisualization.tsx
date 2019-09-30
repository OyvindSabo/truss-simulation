import React, { Component } from 'react';
import * as THREE from 'three';
import { SpaceFrameData } from '../../types';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getAverageNodePosition } from './utils';

interface TrussVisualizationProps {
  spaceFrameData: SpaceFrameData;
}

class TrussVisualization extends Component<TrussVisualizationProps> {
  private myRef: any;
  componentDidMount() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.myRef.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    const scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1, // near
      1000 // far
    );
    camera.position.set(65, 8, -10);

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', this.render);
    controls.minDistance = 1;
    controls.maxDistance = 500;
    controls.enablePan = false;
    const center = getAverageNodePosition(this.props.spaceFrameData);
    controls.target.set(center.x, center.y, center.z);
    console.log('center: ', center);

    var ambient = new THREE.AmbientLight(0xffffff, 0.01);
    scene.add(ambient);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(15, 40, 35);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.05;
    spotLight.decay = 2;
    spotLight.distance = 200;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 1000;
    scene.add(spotLight);

    /*const lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);*/

    /*const shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    scene.add(shadowCameraHelper);*/

    // This is where we start creating the actual space frame
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
      scene.add(nodeMesh);
    });
    struts.forEach(strut => {
      const sourceNode = nodes.find(({ id }) => id === strut.sourceId);
      const targetNode = nodes.find(({ id }) => id === strut.targetId);
      if (!sourceNode || !targetNode) return;
      const { x: sourceX, y: sourceY, z: sourceZ } = sourceNode;
      const { x: targetX, y: targetY, z: targetZ } = targetNode;
      const strutVector = new THREE.Curve<Vector3>();
      strutVector.getPoint = (t: number) =>
        new THREE.Vector3(
          sourceX + t * (targetX - sourceX),
          sourceY + t * (targetY - sourceY),
          sourceZ + t * (targetZ - sourceZ)
        );

      const strutGeometry = new THREE.TubeGeometry(
        strutVector, // path
        128, // tubularSegments
        strut.radius, // radius
        32 // radiusSegments
      );
      const strutMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
      });
      const strutMesh = new THREE.Mesh(strutGeometry, strutMaterial);
      strutMesh.castShadow = true; //default is false
      strutMesh.receiveShadow = false; //default
      scene.add(strutMesh);
    });

    //Create a plane that receives shadows (but does not cast them)
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0x808080,
      dithering: true,
    });

    var planeGeometry = new THREE.PlaneBufferGeometry(2000, 2000);

    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    // Lower the floor plane enough to avoid the radius of the struts causing
    // intersection with the ground.
    const maxRadius = Math.max(...struts.map(({ radius }) => radius), 0);
    planeMesh.position.set(0, -maxRadius, 0);
    planeMesh.rotation.x = -Math.PI * 0.5;
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);

    const animate = () => {
      requestAnimationFrame(animate);
      //cube.rotation.x += 0.01;
      //cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }
  render() {
    return <div ref={ref => (this.myRef = ref)} />;
  }
}

export default TrussVisualization;
