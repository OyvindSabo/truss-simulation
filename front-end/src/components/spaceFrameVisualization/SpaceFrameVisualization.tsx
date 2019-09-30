import React, { Component } from 'react';
import * as THREE from 'three';
import { SpaceFrameData } from '../../types';
import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface TrussVisualizationProps {
  spaceFrameData: SpaceFrameData;
}

class TrussVisualization extends Component<TrussVisualizationProps> {
  private myRef: any;
  componentDidMount() {
    //Create a WebGLRenderer and turn on shadows in the renderer
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
    controls.minDistance = 20;
    controls.maxDistance = 500;
    controls.enablePan = false;

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
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;
    scene.add(spotLight);

    const lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);

    const shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    scene.add(shadowCameraHelper);

    // This is where we start creating the actual space frame
    const { nodes, struts } = this.props.spaceFrameData;
    struts.forEach(strut => {
      const sourceCoordinates = nodes.find(node => node.id === strut.sourceId);
      const targetCoordinates = nodes.find(node => node.id === strut.targetId);
      const strutVector = new THREE.Curve<Vector3>();
      strutVector.getPoint = (t: number) =>
        new THREE.Vector3(
          sourceCoordinates!.x +
            t * (targetCoordinates!.x - sourceCoordinates!.x),
          sourceCoordinates!.y +
            t * (targetCoordinates!.y - sourceCoordinates!.y),
          sourceCoordinates!.z +
            t * (targetCoordinates!.z - sourceCoordinates!.z)
        );

      const strutGeometry = new THREE.TubeGeometry(
        strutVector, // path
        128, // tubularSegments
        strut.radius, // radius
        32 // radiusSegments
      );
      const strutMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const strutMesh = new THREE.Mesh(strutGeometry, strutMaterial);
      strutMesh.castShadow = true; //default is false
      strutMesh.receiveShadow = false; //default
      scene.add(strutMesh);
    });

    /*const helix = new THREE.Curve<Vector3>();
    helix.getPoint = function(t) {
      var s = (t - 0.5) * 12 * Math.PI;
      // As t ranges from 0 to 1, s ranges from -6*PI to 6*PI
      return new THREE.Vector3(5 * Math.cos(s), s, 5 * Math.sin(s));
    };

    const geometry = new THREE.TubeGeometry(helix, 128, 2.5, 32);

    //const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    cube.castShadow = true; //default is false
    cube.receiveShadow = false; //default

    scene.add(cube);*/
    // This is where we stop creating the actual space frame

    //Create a plane that receives shadows (but does not cast them)
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0x808080,
      dithering: true,
    });

    var planeGeometry = new THREE.PlaneBufferGeometry(2000, 2000);

    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.set(0, -1, 0);
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
