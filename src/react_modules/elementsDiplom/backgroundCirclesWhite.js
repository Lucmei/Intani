import React from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';

const BackgroundCircles = () => {
  const { size } = useThree();
  const circleGeometry = new THREE.CircleGeometry(1, 64);
  const edges = new THREE.EdgesGeometry(circleGeometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 'black', linewidth: 5 });
  return (
    <mesh position={[0, 0, 0]}>
      <primitive object={lineMaterial} attach="material" />
      <primitive object={edges} attach="geometry" />
      <lineSegments args={[edges, lineMaterial]} />
    </mesh>
  );
};

export default BackgroundCircles;
