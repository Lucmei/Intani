

import React, { useState, useEffect } from 'react';
import { useThree } from 'react-three-fiber';
import { Physics, useSphere, useBox } from '@react-three/cannon';


const InitialSphere = () => {
  const [ref] = useSphere(() => ({
    mass: 0,
    position: [0, 0, 0],

  }));

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 16]} />
      <meshBasicMaterial color='white' />
    </mesh>
  );
};

const Sphere = ({ position, onDelete, 
 }) => {
  const [ref] = useSphere(() => ({
    mass: 1,
    position,

  }));

  useEffect(() => {
    const timeout = setTimeout(() => {
      onDelete();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [onDelete]);

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 16]} />
      <meshBasicMaterial color="white" wireframe={true} />
    </mesh>
  );
};




const FrontWall = (props) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    ...props,
  }));

  return (
    <mesh ref={ref} renderOrder={1}>
      <boxGeometry args={props.args} />
      <meshBasicMaterial color='blue' visible={false} pointerEvents="none" />
    </mesh>
  );
};

const Wall = (props) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    ...props,
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={props.args} />
      <meshBasicMaterial color='black' pointerEvents="none" />
    </mesh>
  );
};

const Scene4 = ({ layer }) => {
  const { size } = useThree();
  const [spheres, setSpheres] = useState([]);



  function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
  }

  const handleClick = (e) => {
    e.stopPropagation();
    const newSpheres = [];
    for (let i = 0; i < 1; i++) {
      newSpheres.push({
        position: [getRandomInt(-5, 5), getRandomInt(0, 5), 0],
        // size: sphereRadius,
      });
    }
    setSpheres((prev) => [...prev, ...newSpheres]);
  };

  const handleDelete = (index) => {
    setSpheres((prev) => prev.filter((_, i) => i !== index));
  };

  const wallThickness = 0.01;
  const scaledHeight = size.height / 30;

  return (
    <mesh layers={layer} onClick={handleClick}>
      <Physics
        gravity={[0, -9.81, 0]}
        defaultContactMaterial={{
          contactEquationStiffness: 1e7,
          contactEquationRelaxation: 4,
          friction: 1,
        }}>

        <FrontWall
          position={[0, 0, -2]}
          args={[100, 100, wallThickness]}
        />
        <FrontWall
          position={[0, 0, 2]}
          args={[100, 100, wallThickness]}
        />
        <InitialSphere/>
        {spheres.map((sphere, i) => (
          <Sphere
          key={i}
            position={sphere.position}
            onDelete={() => handleDelete(i)}
          />
        ))}
      </Physics>
    </mesh >
  );
};


export default Scene4;
