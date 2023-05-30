import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

const SphereGrid = () => {
  const gridSize = 5;
  const sphereSize = 1;
  const spacing = sphereSize * 6;
  const elements = [];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      elements.push(
        <mesh key={`${i}-${j}`} position={[i * spacing - (gridSize * spacing) / 2 + spacing / 2, j * spacing - (gridSize * spacing) / 2 + spacing / 2, 0]}>
          <sphereGeometry args={[sphereSize, 32, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      );
    }
  }

  return <>{elements}</>;
};const Scene7 = ({ layer }) => {
  const { size, camera } = useThree();
  const [hovered, setHovered] = useState(false);
  const defaultCameraPosition = useRef(camera.position.clone());
  const rotationRef = useRef();

  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);

  const groupRef = useRef();
  const pivotRef = useRef();

  const defaultCameraQuaternion = useRef();

  useEffect(() => {
    if (pivotRef.current) {
      defaultCameraQuaternion.current = pivotRef.current.quaternion.clone();
    }
  }, [pivotRef]);

  useFrame(({ mouse }) => {
    if (hovered) {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 25, 0.1);
      rotationRef.current.rotation.y = THREE.MathUtils.lerp(rotationRef.current.rotation.y, mouse.x * 1, 0.1);
      rotationRef.current.rotation.x = THREE.MathUtils.lerp(rotationRef.current.rotation.x, -mouse.y * 1, 0.1);
    } else {
      camera.position.lerp(defaultCameraPosition.current, 0.1);
      rotationRef.current.rotation.y = THREE.MathUtils.lerp(rotationRef.current.rotation.y, 0, 0.1);
      rotationRef.current.rotation.x = THREE.MathUtils.lerp(rotationRef.current.rotation.x, 0, 0.1);
    }
  });

  return (
    <mesh layers={layer} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh position={[0, 0, -11]}>
        <planeGeometry args={[size.width / 2, size.height / 2]} />
        <meshBasicMaterial color="black" />
      </mesh>
        <group ref={rotationRef}>
          <group position={[0, 0, 0]}>
            <SphereGrid />
          </group>
          <group position={[12, 0, -12]} rotation={[0, Math.PI / 2, 0]}>
            <SphereGrid />
          </group>
          <group position={[-12, 0, -12]} rotation={[0, -Math.PI / 2, 0]}>
            <SphereGrid />
          </group>
          <group position={[0, 12, -12]} rotation={[-Math.PI / 2, 0, 0]}>
            <SphereGrid />
          </group>
          <group position={[0, -12, -12]} rotation={[-Math.PI / 2, 0, 0]}>
            <SphereGrid />
          </group>
        </group>
    </mesh>
  );
};

export default Scene7;
