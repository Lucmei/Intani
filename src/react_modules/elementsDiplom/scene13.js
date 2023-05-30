import { useFrame, useThree, Canvas } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useBox, useSphere, Physics } from '@react-three/cannon'
import { Html, PerspectiveCamera } from '@react-three/drei';


const Camera = ({ sphereApi, ...props }) => {
  const ref = useRef();
  const { set } = useThree();

  useEffect(() => {
    if (ref.current) {
      set({ camera: ref.current });
      ref.current.rotation.order = 'YXZ';  // Set rotation order
      ref.current.rotation.y = - Math.PI / 2;
      ref.current.rotation.x = -0.135;
    }
  }, [ref, set]);

  const position = [20, 3, 0];

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      position={position}
      fov={155} 
      near={0.1}
      far={1000}
      {...props}
    />
  );
};


const Floor = (props) => {
  const [ref] = useBox(() => ({ mass: 0, position: [0, -6, 0], args: [300, 10, 50] }));

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[300, 10, 50]} />
      <meshStandardMaterial color="White" />
    </mesh>
  );
};

const Sphere = ({ obstacles, setSphereApi, setObstaclePositions, handleClearObstacle, spherePosition, setSpherePosition }) => {
  const [ref, api] = useSphere(() => ({ mass: 1, position: [40, 1, 0], args: [1] }));
  const [isJumpAllowed, setIsJumpAllowed] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (api) {
      setSphereApi(api);
    }
  }, [api]);



  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && isJumpAllowed) {
        api.applyImpulse([0, 10, 0], [0, 0, 0]);
        setIsJumpAllowed(false);
        setTimeout(() => setIsJumpAllowed(true), 1000);  // Re-enable jumping after 1 second
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [api, isJumpAllowed]);


  useEffect(() => {
    if (api) {
      const unsubscribe = api.position.subscribe(([x, y, z]) => {
        setSpherePosition([x, y, z]);  // Update sphere position

        obstacles.forEach(([obstacleX, obstacleY, obstacleZ], index) => {
          if (Math.abs(x - obstacleX) <= 1 && y > obstacleY + 1) {
            handleClearObstacle(index);  // Notify Scene13 that an obstacle has been cleared
          }
        });
      });
      return () => unsubscribe();
    }
  }, [api, obstacles, handleClearObstacle]);


  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry attach="geometry" args={[1, 32, 16]} />
      <meshBasicMaterial attach="material" color="white" />
    </mesh>
  );
};


const Obstacle = ({ position, moveObstacle, index, setObstaclePosition }) => {
  const [boxRef, boxApi] = useBox(() => ({ mass: 0, position: position, args: [1, 1, 100] }));

  useEffect(() => {
    const unsubscribe = boxApi.position.subscribe(currentPos => {
      const speed = 0.25; // Define your own speed here.
      const newX = currentPos[0] - speed;
      if (newX < -10) {
        moveObstacle(boxApi, index);
      } else {
        boxApi.position.set(newX, currentPos[1], currentPos[2]);
        setObstaclePosition(index, currentPos);
      }
    });
    return () => unsubscribe();
  }, [boxApi, moveObstacle, index, setObstaclePosition]); // Add throttledPosition to the dependency array

  return (
    <mesh ref={boxRef} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[1, 1, 100]} />
      <meshLambertMaterial attach="material" color="White" />
    </mesh>
  );
};

const Scene13 = () => {
  const generateObstaclePositions = (count) => {
    const obstaclePositions = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 500; // random x position between 100 and 125
      const y = -1;
      const z = 0;
      obstaclePositions.push([x, y, z]);
    }
    return obstaclePositions;
  };

  const [sphereApi, setSphereApi] = useState(null);
  const [score, setScore] = useState(0); // Add this state to keep track of the score
  const [obstaclePositions, setObstaclePositions] = useState(generateObstaclePositions(5));
  const [spherePosition, setSpherePosition] = useState([40, 2, 0]);

  const moveObstacle = (boxApi, index) => {
    const newXPosition = Math.random() * 50 + 100;
    boxApi.position.set(newXPosition, 0, 0);
    setObstaclePositions(prevPositions => {
      const updatedPositions = [...prevPositions];
      updatedPositions[index] = [newXPosition, 0, 0];
      return updatedPositions;
    });
  };

  const setObstaclePosition = (index, newPos) => {
    setObstaclePositions(prevPositions => {
      const updatedPositions = [...prevPositions];
      updatedPositions[index] = newPos;
      return updatedPositions;
    });
  };

  const handleClearObstacle = (index) => {
    setObstaclePositions(prev => prev.filter((_, i) => i !== index));  // Remove the cleared obstacle
    setScore(prev => prev + 1);  // Increase the score
  };

  // console.log(sphereApi);
  // Check if the sphere has left the view and reset the game
  useFrame(() => {
    if (spherePosition && sphereApi) {  // Check if spherePosition and sphereApi have been set
      const [x, y, z] = spherePosition;

      const leftBoundary = -80;
      const rightBoundary = 80;  // Adjust this value based on your setup
      const bottomBoundary = -30;  // Adjust this value based on your setup
      const topBoundary = 10;  // Adjust this value based on your setup

      if (x < leftBoundary || x > rightBoundary || y < bottomBoundary || y > topBoundary) {
        sphereApi.velocity.set(0, 0, 0);
        sphereApi.position.set(40, 1, 0); // Reset sphere position
        setObstaclePositions(generateObstaclePositions(5)); // Reset obstacle positions
        setScore(0); // Reset score
      }
    }
  });


  return (
    <>
      <Physics gravity={[0, -19.81, 0]}>
        <Camera sphereApi={sphereApi} zoom={25} near={0.001} far={10000} />
        <Sphere
          setSphereApi={setSphereApi}
          obstacles={obstaclePositions}
          setObstaclePositions={setObstaclePositions}
          handleClearObstacle={handleClearObstacle}
          spherePosition={spherePosition}
          setSpherePosition={setSpherePosition}
        />

        <Floor />
        {obstaclePositions.map((pos, i) => (
          <Obstacle
            key={i}
            position={pos}
            moveObstacle={moveObstacle}
            setObstaclePosition={setObstaclePosition}
            index={i}
          />
        ))}
        <directionalLight intensity={[0.7]} position={[0, 40, 20]} />
      </Physics>

      <Html position={[30, 1, 0]} >
        <p
          style={{
            color: 'red',
            fontSize: '30px',
          }}
        >
          {score}
        </p>
      </Html>
    </>
  );
};

export default Scene13;
