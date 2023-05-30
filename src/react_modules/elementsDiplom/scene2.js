import React, { useState } from 'react';
import { useThree } from 'react-three-fiber';
import { useSpring, animated } from '@react-spring/three';

const Scene2 = ({ layer }) => {
  const { size } = useThree();
  const [clicked, setClicked] = useState(false);

  const bounceSpring = useSpring({
    scale: clicked ? [2, 2, 2] : [1, 1, 1],
    config: {
      mass: 3,
      friction: 25,
      tension: 1000,
    },
    onRest: () => setClicked(false),
  });

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <mesh layers={layer}>
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[size.width / 2, size.height / 2]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <animated.mesh position={[0, 0, 0]} onClick={handleClick} scale={bounceSpring.scale}>
        <circleGeometry args={[1, 64, 2]} />
        <meshBasicMaterial color="white" />
      </animated.mesh>
    </mesh>
  );
};

export default Scene2;
