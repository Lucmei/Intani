import React, { useRef, useEffect } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

const ContentCube = ({ selectedProject, totalCubes, index }) => {
    const meshRef = useRef();
    const { size } = useThree();

    const edgeColor = new THREE.Color('White');
    const cubeWidth = size.width / 50;
    const cubeHeight = size.height / 50;
    const cubeDepth = cubeWidth;
    const cubeGeometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeHeight);
    const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
    const totalHeight = cubeHeight * totalCubes;
    const heightBelow = cubeHeight * index;
    const yPos = heightBelow - totalHeight / 2 + cubeHeight / 2;

    const [{ rotation }, api] = useSpring(() => ({
        rotation: [0, 0, 0],
        config: {
            mass: 50,
            friction: 200,
            tension: 750,
        },
    }));

    useEffect(() => {
        if (selectedProject) {
            api.start({
                rotation: [Math.PI / 2, 0, Math.PI],
            });
        } else {
            api.start({
                rotation: [0, 0, 0],
            });
        }
    }, [selectedProject, api]);

    const handlePointerEnter = () => {
        api.start({
            rotation: [Math.PI / 2, 0, Math.PI],
        });
    };

    const handlePointerLeave = () => {
        api.start({
            rotation: [0, 0, 0],
        });
    };
    return (
        <animated.mesh
            ref={meshRef}
            position={[0, 0, 0]}
            // scale={[size.width /2,0,0]}
            rotation={rotation}
        >
            <mesh
                onPointerOver={(event) => handlePointerEnter(event)}
                onPointerOut={(event) => handlePointerLeave(event)}
            >
                <primitive object={cubeGeometry} />
                <meshPhongMaterial color={'white'} shininess={500} />
            </mesh>
            <lineSegments>
                <primitive object={edgesGeometry} />
                <lineBasicMaterial color={edgeColor} />
            </lineSegments>
        </animated.mesh>
    );
};

export default ContentCube;
