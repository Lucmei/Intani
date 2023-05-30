import React, { useState, useEffect } from 'react';
import { useThree } from 'react-three-fiber';
import { useSpring, animated } from '@react-spring/three';

const Scene3 = ({ layer }) => {
  const { size } = useThree();
  const [clicked, setClicked] = useState(false);
  const [position, setPosition] = useState([0, 0, 0]);
  const [clickTimestamp, setClickTimestamp] = useState(null);

  const positionSpring = useSpring({
    position: clicked ? position : [0, 0, 0],
    config: {
      mass: 2,
      tension: 1000,
      friction: 50,
    },
  });

  const randomPosition = () => {
    const xMin = -size.height / 90;
    const xMax = size.height / 90;
    const yMin = -size.height / 90;
    const yMax = size.height / 90;
    const z = -Math.random() * 10;

    let x, y;

    do {
      x = Math.random() * (xMax - xMin) + xMin;
      y = Math.random() * (yMax - yMin) + yMin;
    } while (Math.abs(x) < size.width / 200 && Math.abs(y) < size.height / 200);

    return [x, y, z];
  };

  const handleClick = () => {
    setPosition(randomPosition());
    setClicked(true);
    setClickTimestamp(Date.now());
  };

  useEffect(() => {
    let timeout;
    if (clicked) {
      timeout = setTimeout(() => {
        if (Date.now() - clickTimestamp >= 5000) {
          setPosition([0, 0, 0]);
          setClicked(false);
        }
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [clicked, clickTimestamp]);

  return (
    <mesh layers={layer}>
      <mesh position={[0, 0, -100]}>
        <planeGeometry args={[size.width / 2, size.height / 2]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <animated.mesh
        position={positionSpring.position}
        onClick={handleClick}
      >
        <circleGeometry args={[1, 64, 2]} />
        <meshBasicMaterial color="white" />
      </animated.mesh>
    </mesh>
  );
};

export default Scene3;
