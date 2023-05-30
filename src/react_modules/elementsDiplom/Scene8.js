import React from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';

const Scene8 = ({ layer }) => {
  const { size} = useThree();

  return (
    <mesh layers={layer}>
    </mesh>
  );
};

export default Scene8;
