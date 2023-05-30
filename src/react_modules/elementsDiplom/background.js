import React, { useMemo } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';

const Background = ({ color }) => {
  const { gl, scene, camera, size } = useThree();
  const backgroundColor = useMemo(() => new THREE.Color(color), [color]);

  gl.setClearColor(backgroundColor);
  gl.clearColor();

  return null;
};

export default Background;
