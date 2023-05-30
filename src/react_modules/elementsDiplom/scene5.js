import React, { useState, useRef, useEffect } from 'react';
import { useThree } from 'react-three-fiber';

const Scene5 = ({ layer }) => {
  const { size, camera, raycaster } = useThree();
  const [lightPosition, setLightPosition] = useState(null);
  const lightRef = useRef();
  const whiteSphereRef = useRef();
  const canvasRef = useRef();


  useEffect(() => {
    canvasRef.current = document.querySelector('canvas');
  }, []);


  const handlePointerMove = (e) => {
    e.stopPropagation();
    setLightPosition([e.unprojectedPoint.x*15, e.unprojectedPoint.y*15, 2]);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setLightPosition(null);
  };

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.visible = lightPosition !== null;
    }
    if (whiteSphereRef.current) {
      whiteSphereRef.current.visible = lightPosition === null;
    }
  }, [lightPosition]);

  return (
    <mesh
      layers={layer}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
    >
      <mesh position={[0, 0, -1]} receiveShadow>
        <planeGeometry args={[size.width / 2, size.height / 2]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0, 0, 1]} castShadow>
        <sphereGeometry args={[0.85, 64, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh ref={whiteSphereRef} position={[0, 0, 2]} visible={false}>
        <sphereGeometry args={[0.6, 64, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <spotLight
        ref={lightRef}
        position={lightPosition || [0, 0, 4]}
        target-position={[0, 0, 0]}
        angle={1}
        penumbra={1}
        castShadow
        shadow-radius={1000}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={150}
      />
    </mesh>
  );
};

export default Scene5;
