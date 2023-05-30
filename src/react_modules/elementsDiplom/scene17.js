import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

const SphereGrid = ({ numSpheres, spacing, setHoveredSphere }) => {
  const elements = [];
  const sphereSize = 1;

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  
  for (let i = 0; i < numSpheres; i++) {
    for (let j = 0; j < numSpheres; j++) {
      const ref = useRef();

      useFrame(() => {
        const hoveredSphere = setHoveredSphere.current;

        if (hoveredSphere) {
          const distance = ref.current.position.distanceTo(hoveredSphere.position);

          if (ref.current === hoveredSphere) {
            ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, sphereSize * 8, 0.4);
          } else if (distance <= 2.5) {
            ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, sphereSize * 6, 0.3);
          } else if (distance <= 2.5 * 2) {
            ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, sphereSize * 4, 0.2);
          } else if (distance <= 2.5 * 3) {
            ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, sphereSize * 2, 0.1);
          } else {
            ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, 0, 0.01);
          }
        } else {
          ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, 0, 0.01);
        }
      });

      elements.push(
        <mesh key={`${i}-${j}`} position={[i * spacing - (numSpheres * spacing) / 2 + spacing / 2, j * spacing - (numSpheres * spacing) / 2 + spacing / 2, 0]} ref={ref}
          onPointerOver={() => setHoveredSphere.current = ref.current} onPointerOut={() => setHoveredSphere.current = null}>
          <sphereGeometry args={[sphereSize, 32, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      );
    }
  }

  return <>{elements}</>;
};

const Scene17 = ({ layer }) => {
  const { size, camera } = useThree();
  const defaultCameraPosition = useRef(camera.position.clone());
  const setHoveredSphere = useRef(null);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [spacing, setSpacing] = useState(2);

  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(() => {
    if (isMouseInside) {
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 15, 0.1);
      setSpacing(Number(THREE.MathUtils.lerp(spacing, 2, 0.2).toFixed(1)));
    } else {
      camera.position.lerp(defaultCameraPosition.current, 0.5);
      setSpacing(Number(THREE.MathUtils.lerp(spacing, 10, 0.1).toFixed(1)));
    }
  });

  const groupRef = useRef();
  const numSpheres = 13;

  useEffect(() => {
    Array.from({ length: numSpheres }, (_, i) => ({
      position: new THREE.Vector3(
        (i % Math.sqrt(numSpheres)) * 6 - ((Math.sqrt(numSpheres) - 1) * 6) / 2 + 3,
        Math.floor(i / Math.sqrt(numSpheres)) * 6 - ((Math.sqrt(numSpheres) - 1) * 6) / 2 + 3,
        0
      ),
      defaultZ: 0,
    }));
  }, []);

  return (
    <mesh layers={layer}
      onPointerEnter={() => setIsMouseInside(true)}
      onPointerLeave={() => { setIsMouseInside(false); setHoveredSphere.current = null; }}>
      <mesh position={[0, 0, -11]}>
        <planeGeometry args={[size.width / 2, size.height / 2]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <group ref={groupRef}>
        <group position={[0, 0, 0]}>
          <SphereGrid numSpheres={numSpheres} spacing={spacing} setHoveredSphere={setHoveredSphere} />
        </group>
      </group>
    </mesh>
  );
};

export default Scene17;
