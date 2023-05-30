import React, { useEffect, useRef, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Physics, useSphere, useBox, useCompoundBody } from '@react-three/cannon';
import { Triangle, Vector3 } from 'three';

const Wall = ({ position, rotation, size }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position: position,
    rotation: rotation,
    args: size,
  }));

  return (
    <mesh ref={ref} >
      <boxGeometry args={size} />
      <meshStandardMaterial transparent={true} />
    </mesh>
  );
};

const Wall2 = () => {
  return (
    <mesh position={[0, 0, -26]} rotation={[0, Math.PI / 0.00001, 0]}>
      <planeGeometry args={[500, 500, 1]} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
};


const Box = React.forwardRef(({ position, size, rotation, reset, setPosition }, externalRef) => {
  const [boxRef, api] = useBox(() => ({
    mass: 1,
    position: position,
    args: size,
    rotation: rotation
  }));
  const pos = useRef(position);

  useEffect(() => {
    if (reset) {
      api.position.set(...position);
    }
  }, [reset, position, api]);

  // New effect to subscribe to position changes
  useEffect(() => {
    const unsubscribe = api.position.subscribe((v) => {
      pos.current = v;
      setPosition(v);
    });

    return () => unsubscribe();
  }, [api.position, setPosition]);

  useEffect(() => {
    if (externalRef) {
      externalRef.current = {
        mesh: boxRef.current,
        api: api
      };
    }
  }, [boxRef, api, externalRef]);

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
});

const Roof = React.forwardRef(({ position, size, rotation, reset, setPosition }, externalRef) => {
  const [roofRef, api] = useBox(() => ({
    mass: 1,
    position: position,
    args: size,
    rotation: rotation
  }));
  const pos = useRef(position);

  useEffect(() => {
    if (reset) {
      api.position.set(...position);
    }
  }, [reset, position, api]);

  // New effect to subscribe to position changes
  useEffect(() => {
    const unsubscribe = api.position.subscribe((v) => {
      pos.current = v;
      setPosition(v);
    });

    return () => unsubscribe();
  }, [api.position, setPosition]);

  useEffect(() => {
    if (externalRef) {
      externalRef.current = {
        mesh: roofRef.current,
        api: api
      };
    }
  }, [roofRef, api, externalRef]);

  return (
    <mesh ref={roofRef}>
      <coneGeometry args={size} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
});


const Sphere = React.forwardRef(({ position,velocity, args, reset, mouseIsOverCanvas, setPosition }, ref) => {
  const [sphereRef, sphereApi] = useSphere(() => ({
    mass: 10,
    position: position,
    args: args,
    velocity: velocity,
  }));
  const [lightIntensity, setLightIntensity] = useState(0);
  const pos = useRef(position, velocity);
  useEffect(() => {
    if (reset) {
      sphereApi.position.set(...position);
      setLightIntensity(0);
      sphereApi.velocity.set(0, 0, 0);
    }
  }, [reset, position, sphereApi]);

  useEffect(() => {
    const unsubscribe = sphereApi.position.subscribe((v) => {
      pos.current = v;
      setPosition(v);
    });

    return () => unsubscribe();
  }, [sphereApi.position, setPosition]);

  useEffect(() => {
    if (ref) {
      ref.current = {
        mesh: sphereRef.current,
        api: sphereApi
      };
    }
  }, [sphereRef, sphereApi, ref]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!mouseIsOverCanvas || !sphereRef.current) {
        return;
      } else {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          sphereApi.wakeUp();
          if (lightIntensity === 0) {
            let startTime;
            const animate = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;
              const progress = elapsed / 500; // duration is 500ms
              setLightIntensity(Math.min(progress, 0.9));
              if (progress < 0.9) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightIntensity, sphereApi, mouseIsOverCanvas]);

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={args} />
      <meshBasicMaterial color="white" />
      <pointLight color="white" intensity={lightIntensity} distance={50.0} />
    </mesh>
  );
});

const Scene9 = () => {
  const { camera } = useThree();
  const sphereRef = useRef();
  const [mouseIsOverCanvas, setMouseIsOverCanvas] = useState(false);

  const box1Ref = useRef();
  const box2Ref = useRef();
  const box3Ref = useRef();
  const box4Ref = useRef();
  const box5Ref = useRef();
  const box6Ref = useRef();
  const roof7Ref = useRef();
  const roof8Ref = useRef();

  const [BoxPosition1, setBoxPosition1] = useState([-3, -21, -13]);
  const [BoxPosition2, setBoxPosition2] = useState([3, -21, -20]);
  const [BoxPosition3, setBoxPosition3] = useState([0, -16, -15]);
  const [BoxPosition4, setBoxPosition4] = useState([-3, -12, -23]);
  const [BoxPosition5, setBoxPosition5] = useState([3, -12, -20]);
  const [BoxPosition6, setBoxPosition6] = useState([0, -8, -10]);
  const [RoofPosition7, setRoofPosition7] = useState([-4, -21, -15]);
  const [RoofPosition8, setRoofPosition8] = useState([4, -21, -10]);
  const [SpherePosition9, setSpherePosition9] = useState([0, -23.4, 0]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!mouseIsOverCanvas || !sphereRef.current) {
        return;
      } else {

        const force = 750;
        const direction = { x: 0, y: 0, z: 0 };

        switch (e.key) {
          case 'ArrowUp':
            direction.z = -2;
            break;
          case 'ArrowDown':
            direction.z = 2;
            break;
          case 'ArrowLeft':
            direction.x = -2;
            break;
          case 'ArrowRight':
            direction.x = 2;
            break;
          default:
            return;
        }

        sphereRef.current.api.applyForce(
          [direction.x * force, direction.y * force, direction.z * force],
          [0, 0, 0]
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mouseIsOverCanvas]);

  useEffect(() => {
    let timer;
    if (!mouseIsOverCanvas) {
      setAllowRendering(true); // Ensure rendering continues when mouse leaves
      timer = setTimeout(() => {
        setAllowRendering(false); // Stop rendering 2 seconds after mouse leaves
  
        const initialPositions = {
          BoxPosition1: [-3, -21, -13],
          BoxPosition2: [3, -21, -20],
          BoxPosition3: [0, -16, -15],
          BoxPosition4: [-3, -12, -23],
          BoxPosition5: [3, -12, -20],
          BoxPosition6: [0, -8, -10],
          RoofPosition7: [-4, -21, -15],
          RoofPosition8: [4, -21, -10],
          SpherePosition9: [0, -23.4, 0],
        };
    
        setBoxPosition1(initialPositions.BoxPosition1);
        setBoxPosition2(initialPositions.BoxPosition2);
        setBoxPosition3(initialPositions.BoxPosition3);
        setBoxPosition4(initialPositions.BoxPosition4);
        setBoxPosition5(initialPositions.BoxPosition5);
        setBoxPosition6(initialPositions.BoxPosition6);
        setRoofPosition7(initialPositions.RoofPosition7);
        setRoofPosition8(initialPositions.RoofPosition8);
        setSpherePosition9(initialPositions.SpherePosition9);
  
        if(sphereRef.current) {
          sphereRef.current.api.velocity.set(0, 0, 0); // Reset the velocity
        }
  
        setReset(true);
      }, 2000); // 2 seconds delay
    } else {
      clearTimeout(timer); // Clear the timer if mouse is over the canvas
      setAllowRendering(true); // Continue rendering when mouse is over the canvas
    }
  
    return () => clearTimeout(timer); // Clear the timer on unmount
  }, [mouseIsOverCanvas]);
  
  
  const [allowRendering, setAllowRendering] = useState(true);

  useFrame(() => {
    if (!allowRendering || !sphereRef.current) {
      return;
    }
    const targetPosition = new Vector3(
      SpherePosition9[0], 
      SpherePosition9[1] + 3,
      SpherePosition9[2] + 4 
    );
    camera.position.lerp(targetPosition, 0.1);
    camera.lookAt(new Vector3(...SpherePosition9));
  });

  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      setTimeout(() => setReset(false), 0);
    }
  }, [reset]);

  return (
    <mesh
      onPointerOver={() => setMouseIsOverCanvas(true)}
      onPointerOut={() => setMouseIsOverCanvas(false)}

    >
      <Physics gravity={[0, -10, 0]}>
        <Wall position={[0, -25, 0]} rotation={[Math.PI / 2, 0, 0]} size={[50, 50, 1]} />
        <Wall position={[25, 0, 0]} rotation={[0, Math.PI / 2, 0]} size={[50, 50, 1]} />
        <Wall position={[-25, 0, 0]} rotation={[0, -Math.PI / 2, 0]} size={[50, 50, 1]} />
        <Wall position={[0, 0, -25]} rotation={[0, 0, 0]} size={[50, 50, 1]} />
        <Wall2 />

        <Box ref={box1Ref} position={BoxPosition1} size={[1, 6, 2]} rotation={[0, Math.PI / 3, 0]} reset={reset} setPosition={setBoxPosition1} />
        <Box ref={box2Ref} position={BoxPosition2} size={[1, 6, 2]} rotation={[0, -Math.PI / 3, 0]} reset={reset} setPosition={setBoxPosition2} />
        <Box ref={box3Ref} position={BoxPosition3} size={[1, 8, 2]} rotation={[Math.PI / 4, 0, Math.PI / 2]} reset={reset} setPosition={setBoxPosition3} />
        <Box ref={box4Ref} position={BoxPosition4} size={[1, 6, 2]} rotation={[0, Math.PI / 3, 0]} reset={reset} setPosition={setBoxPosition4} />
        <Box ref={box5Ref} position={BoxPosition5} size={[1, 6, 2]} rotation={[0, -Math.PI / 3, 0]} reset={reset} setPosition={setBoxPosition5} />
        <Box ref={box6Ref} position={BoxPosition6} size={[1, 8, 2]} rotation={[Math.PI / 4, 0, Math.PI / 2]} reset={reset} setPosition={setBoxPosition6} />

        <Roof ref={roof7Ref}position={RoofPosition7} size={[2, 2, 4]} rotation={[0, Math.PI / 3, 0]} reset={reset} setPosition={setRoofPosition7} />
        <Roof ref={roof8Ref}position={RoofPosition8} size={[2, 4, 4]} rotation={[0, Math.PI / 4, 0]} reset={reset} setPosition={setRoofPosition8} />

        <Sphere ref={sphereRef} position={SpherePosition9} args={[1, 64, 32]} reset={reset} mouseIsOverCanvas={mouseIsOverCanvas} setPosition={setSpherePosition9} />
      </Physics>
    </mesh>
  );
};

export default Scene9;
