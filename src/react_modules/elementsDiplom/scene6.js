import React, { useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

const Scene2 = ({ layer }) => {
  const { size, viewport } = useThree();
  const planeMaterialRef = useRef();
  const sphereMaterialRef = useRef();

  useFrame(({ mouse }) => {
    if (planeMaterialRef.current && sphereMaterialRef.current) {
      const mouseVector = new THREE.Vector2(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2
      );
      planeMaterialRef.current.uniforms.mouse.value = mouseVector;
      sphereMaterialRef.current.uniforms.mouse.value = mouseVector;
    }
  });

  const createShaderMaterial = () =>
    new THREE.ShaderMaterial({
      uniforms: {
        mouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vPosZ;
        uniform vec2 mouse;

        float falloff(float dist, float maxDist) {
          float falloffWidth = 1.5;
          float center = smoothstep(1.0, maxDist, dist);
          float falloffStart = smoothstep(maxDist - falloffWidth, maxDist, dist);
          return center - falloffStart;
        }

        void main() {
          vUv = uv;
          vec3 pos = position;
          float dist = distance(vec2(pos.x, pos.y), mouse);
          float maxDist = 2.0;
          pos.z += 1.0 * falloff(dist, maxDist);
          vPosZ = pos.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.9);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vPosZ;

        void main() {
          vec4 color;
          if (vPosZ < 0.5) {
            color = vec4(0.0, 0.0, 0.0, 0.9);
          } else {
            color = vec4(0.9, 0.9, 0.9, 0.9);
          }
          gl_FragColor = color;
        }
      `,
    });

  return (
    <mesh layers={layer}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[size.width / 31.5, size.height / 30, 30, 30]} />
        <primitive object={createShaderMaterial()} ref={planeMaterialRef}  />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 32]} />
        <primitive object={createShaderMaterial()} ref={sphereMaterialRef} />
      </mesh>
    </mesh>
  );
};

export default Scene2;
