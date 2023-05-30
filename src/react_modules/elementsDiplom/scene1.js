import React, { useState, useEffect } from 'react';
import { useThree } from 'react-three-fiber';
import { useSpring, animated } from '@react-spring/three';

const Scene1 = () => {
  const { size } = useThree();
  const [color, setColor] = useState('white');
  const [bgColor, setBgColor] = useState('black');
  const [clicked, setClicked] = useState(false);

  const colorSpring = useSpring({
    color: color,
    config: { duration: 50 },
  });

  const bgColorSpring = useSpring({
    color: bgColor,
    config: { duration: 50 },
  });

  const colorSpringEnd = useSpring({
    color: color,
    config: { duration: 5000 },
  });

  const bgColorSpringEnd = useSpring({
    color: bgColor,
    config: { duration: 5000 },
  });

  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleClick = () => {
    setColor(randomColor());
    setBgColor(randomColor());
    setClicked(true);
  };
  
  // Inside useEffect:
  useEffect(() => {
    let timeout;
    if (clicked) {
      clearTimeout(timeout); // Clear the previous timeout
      timeout = setTimeout(() => {
        setClicked(false);
        setColor('white');
        setBgColor('black');
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [clicked]);
  
  
  

  return (
    <mesh>
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[size.width / 2, size.height / 2]} />
        <animated.meshBasicMaterial color={bgColorSpring.color} />
      </mesh>
      <mesh position={[0, 0, 0]} onClick={handleClick}>
        <circleGeometry args={[1, 64, 2]} />
        <animated.meshBasicMaterial color={colorSpring.color} />
      </mesh>
    </mesh>
  );
};

export default Scene1;
