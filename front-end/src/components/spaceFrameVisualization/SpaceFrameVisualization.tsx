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
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50);

    //Create a WebGLRenderer and turn on shadows in the renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', this.render);
    controls.minDistance = 50;
    controls.maxDistance = 500;
    controls.enablePan = false;

    var ambient = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambient);

    //Create a SpotLight and turn on shadows for the light
    var light = new THREE.SpotLight(0xffffff);
    light.castShadow = true; // default false
    scene.add(light);

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default

    renderer.setSize(window.innerWidth, window.innerHeight);
    this.myRef.appendChild(renderer.domElement);

    const helix = new THREE.Curve<Vector3>();
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

    scene.add(cube);

    //Create a plane that receives shadows (but does not cast them)
    var planeGeometry = new THREE.PlaneBufferGeometry(100, 100, 32, 32);
    var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    scene.add(plane);

    //Create a helper for the shadow camera (optional)
    var helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }
  render() {
    return <div ref={ref => (this.myRef = ref)} />;
  }
}

export default TrussVisualization;
