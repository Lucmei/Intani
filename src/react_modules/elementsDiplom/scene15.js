
import React from 'react';
import { useThree } from 'react-three-fiber';

const Scene15 = ({ layer }) => {
  const { size } = useThree();

  return (
    <mesh layers={layer}>
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[size.width / 2, size.height / 2]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <circleGeometry 
        args={[1, 64, 2]}
         />
        <meshBasicMaterial color="white" />
      </mesh>
    </mesh>
  );
};

export default Scene15;
