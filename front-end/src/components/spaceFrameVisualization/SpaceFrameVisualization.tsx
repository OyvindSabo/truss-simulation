import React, { Component } from 'react';
import * as THREE from 'three';
import { SpaceFrameData } from '../../types';
import { Vector3 } from 'three';

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
    var renderer = new THREE.WebGLRenderer();
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
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 50;
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
