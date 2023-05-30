import React from 'react';
import * as THREE from 'three';

const Plane = () => {
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 1,1);
    return (
      <mesh rotation={[-Math.PI / 4, 0, 0]} position={[50, -20, 0]}>
        <primitive object={planeGeometry} />
        <meshBasicMaterial color={'black'} />
      </mesh>
    );
  };

export default Plane;