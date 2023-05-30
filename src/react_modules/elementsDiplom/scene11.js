import React, { useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

const Scene11 = ({ layer }) => {
  const { size, camera } = useThree();
  const meshRef = useRef();
  const velocity = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());
  const cursor = useRef(new THREE.Vector3());

  useFrame(({ mouse }) => {
    if (meshRef.current) {
      // Update the cursor position
      cursor.current.set(mouse.x * size.width / 2, mouse.y * size.height / 2, 0);

      // Calculate the distance to the mouse
      const distToMouse = target.current.distanceTo(cursor.current);

      if (distToMouse < 0.3 * size.width) {
        // If the mouse is close, move away from the mouse
        const dir = target.current.clone().sub(cursor.current).normalize();
        velocity.current.add(dir);
      }

      // Always move back to the center
      const dirToCenter = new THREE.Vector3().sub(target.current).multiplyScalar(0.05);
      velocity.current.add(dirToCenter);

      // Apply some friction so the circle doesn't move forever
      velocity.current.multiplyScalar(0.35);

      // Update the circle position and ensure it stays within the canvas boundaries
      target.current.add(velocity.current);
      target.current.x = Math.max(Math.min(target.current.x, size.width / 2 - 1), -size.width / 2 + 1);
      target.current.y = Math.max(Math.min(target.current.y, size.height / 2 - 1), -size.height / 2 + 1);

      // Update mesh position
      meshRef.current.position.copy(target.current);
    }
  });

  return (
    <mesh layers={layer}>
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[size.width / 2, size.height / 2]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <circleGeometry args={[1, 64, 2]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </mesh>
  );
};

export default Scene11;
