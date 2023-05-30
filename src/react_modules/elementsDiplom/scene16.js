import React, { useState, useEffect } from 'react';
import { useThree } from 'react-three-fiber';
import { useSpring, animated } from '@react-spring/three';

const Scene16 = ({ layer, mouseIsOverCanvas15 }) => {
  const { size } = useThree();
  const [vibrationIntensity, setVibrationIntensity] = useState(0);
  const [currentPosition, setCurrentPosition] = useState([0, 0, 0]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [intervalDuration, setIntervalDuration] = useState(100);  // state for interval duration

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeElapsed(timeElapsed => timeElapsed + 0.1);
    }, 100);

    return () => {
      clearInterval(timerId);
    }
  }, []);



  useEffect(() => {
    // Updated to check if mouse is over the canvas
    const handleMouseMove = () => {
      if ( mouseIsOverCanvas15) {
        setVibrationIntensity(0);
      }
      setVibrationIntensity(0);
    };

    const handleMouseLeave = () => {
      setVibrationIntensity(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ mouseIsOverCanvas15]);

  useEffect(() => {
    let animationFrameId;
    let intervalId;
  
    const animateVibration = () => {
      if (mouseIsOverCanvas15) {
        setVibrationIntensity((prevIntensity) => prevIntensity + 0.01);
      } else {
        setVibrationIntensity((prevIntensity) => Math.max(prevIntensity - 0.01, 0));
      }
  
      animationFrameId = requestAnimationFrame(animateVibration);
    };
  
    const startVibration = () => {
      clearInterval(intervalId); // Clear any previous interval
    
      intervalId = setInterval(() => {
        setVibrationIntensity((prevIntensity) => prevIntensity + 0.01);
    
        setIntervalDuration((prevDuration) => {
          const newDuration = prevDuration * 0.9;
    
          clearInterval(intervalId); // Clear the interval before creating a new one
    
          intervalId = setInterval(() => {
            setVibrationIntensity((prevIntensity) => prevIntensity + 0.01);
          }, newDuration);
    
          return newDuration;
        });
      }, intervalDuration);
    };
    const resetTimeElapsed = () => {
      setTimeElapsed(0);
    };
    
    
    const stopVibration = () => {
      clearInterval(intervalId); // Clear the interval
      setIntervalDuration(100); // Reset the interval duration
      resetTimeElapsed(); // Reset the elapsed time
    };
  
    if (mouseIsOverCanvas15) {
      startVibration();
    } else {
      stopVibration();
    }
  
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
    };
  }, [mouseIsOverCanvas15]);

  const [springProps, setSpring] = useSpring(() => ({
    position: currentPosition,
    config: { duration: 200 }  // This config ensures a smooth transition
  }));

  useEffect(() => {
    if (!mouseIsOverCanvas15) {
      setSpring({ position: [0, 0, 0] });
      setVibrationIntensity(0);
    }
  }, [mouseIsOverCanvas15, setSpring]);
  
  useEffect(() => {
    const moveSphere = () => {
      const range = timeElapsed * 0.5; // Maximum displacement range increases over time
      const newX = Math.random() * range - range / 2;
      const newY = Math.random() * range - range / 2;
      const newZ = Math.random() * range - range / 2;
      setSpring({ position: [newX, newY, newZ] });
    };
  
    let intervalId;
  
    if (mouseIsOverCanvas15) {
      moveSphere();
      intervalId = setInterval(moveSphere, 2000);
    }
  
    return () => {
      clearInterval(intervalId);
    };
  }, [setSpring, timeElapsed, mouseIsOverCanvas15]);
  

  






  return (
    <animated.mesh layers={layer}>
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[size.width / 2, size.height / 2]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <animated.mesh position={springProps.position}>
        <circleGeometry args={[1, 64, 2]} />
        <meshBasicMaterial color={`rgb(255, ${255 - (vibrationIntensity * 100)}, ${255 - (vibrationIntensity * 100)})`} />
      </animated.mesh>
    </animated.mesh>
  );
};


export default Scene16;
