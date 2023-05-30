import React, { useRef } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';

import Cube from '../elements/Cube.js';

const createCube = (index, totalCubes, size) => {
  const cubeHeight = size.height / 285;
  const totalHeight = cubeHeight * totalCubes;
  const heightBelow = cubeHeight * index;
  const yPos = heightBelow - totalHeight / 2 + cubeHeight / 2;

  return <Cube key={index} index={index} totalCubes={totalCubes} yPos={yPos} size={size} />;
};

export default createCube;
