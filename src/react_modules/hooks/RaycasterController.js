import { useFrame, useThree } from 'react-three-fiber';
import { useContext, useMemo } from 'react';
import * as THREE from 'three';
import RaycasterContext from '../hooks/raycasterContext.js';

const RaycasterController = ({ mouse }) => {
  const { camera, scene } = useThree();
  const { raycaster, setIntersections } = useContext(RaycasterContext);

  useFrame(() => {
    raycaster.setFromCamera(mouse, camera);
    const newIntersections = raycaster.intersectObjects(scene.children, true);
    setIntersections(newIntersections);
  });

  return null;
};

export default RaycasterController;
