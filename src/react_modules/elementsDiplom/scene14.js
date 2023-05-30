import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Scene14 = ({ isHovered }) => {
  const sphereRef = useRef();

  useEffect(() => {
    if (!isHovered) {
        return;
    }

    const canvas = document.querySelector('canvas');  // You may need to adjust this query selector according to your layout.
  
    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const { width, height, left, top } = canvas.getBoundingClientRect();
        const mouseX = ((clientX - left) / width) * 2 - 1;
        const mouseY = -((clientY - top) / height) * 2 + 1;
        sphereRef.current.rotation.x = -mouseY * 2 + 4.6;
        sphereRef.current.rotation.y = mouseX * 2 +1.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };
}, [ isHovered]);


  const textureLoader = new THREE.TextureLoader();
  const eyeTexture = textureLoader.load('../../../public/assets/imgs/eye.jpg');
  eyeTexture.wrapS = THREE.RepeatWrapping;
  eyeTexture.wrapT = THREE.RepeatWrapping;
  eyeTexture.repeat.set(1, 1);

  const material = isHovered
    ? new THREE.MeshStandardMaterial({ map: eyeTexture, roughness: 0 })
    : new THREE.MeshBasicMaterial({ color: '#ffffff' });

  return (
    <mesh>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 64, 32]} />
        <primitive object={material} />
      </mesh>
      <mesh>
        <pointLight position={[0, 20, 100]} />
      </mesh>
    </mesh>


  );
};

export default Scene14;
