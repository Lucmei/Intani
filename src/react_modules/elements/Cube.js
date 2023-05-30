
import React, { useRef, useState } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import createTexture from '../helpers/createTexture.js';
import { Text } from '@react-three/drei';


const Cube = ({ index, totalCubes, project, setSelectedProject }) => {
    // console.log('Project:', project);

    const meshRef = useRef();
    const { size } = useThree();
    const [textColor1, setTextColor1] = useState('white');


    const edgeColor = new THREE.Color('White');
    const cubeWidth = size.width / 50;
    const cubeHeight = size.height / 285;
    const cubeDepth = cubeWidth;
    const cubeGeometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeDepth);
    const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
    const totalHeight = cubeHeight * totalCubes;
    const heightBelow = cubeHeight * index;
    const yPos = heightBelow - totalHeight / 2 + cubeHeight / 2;

    const [{ rotation }, api] = useSpring(() => ({
        rotation: [0, 0, 0],
        config: {
            mass: 10,
            friction: 200,
            tension: 1000,
        },
    }));

    const handlePointerEnter = (event) => {
        event.stopPropagation();
        api.start({
            rotation: [0, Math.PI / 4, 0],
        });
        setTextColor1('black');
        console.log(project.projektTitel);
    };

    const handlePointerLeave = (event) => {
        event.stopPropagation();
        api.start({
            rotation: [0, 0, 0],
        });
        setTextColor1('white');
    };



    const texture1 = createTexture(project.projektTitel);
    const texture2 = createTexture(project.projektBeschrieb);

    return (
        <animated.mesh
            ref={meshRef}
            position={[0, yPos, 0]}
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
            <Text
                position={[-cubeWidth / 2 + 0.5, 0, cubeDepth / 2 + 0.01]}
                rotation={[0, 0, 0]}
                fontSize={cubeHeight / 4}
                color={textColor1}
                anchorX="left"
                anchorY="middle"
            >
                {project.projektTitel}
            </Text>
            <Text
                position={[-cubeWidth / 2, 0, cubeDepth / 2 - 0.5]}
                rotation={[0, -1.57, 0]}
                fontSize={cubeHeight / 4}
                color="white"
                anchorX="right"
                anchorY="middle"
            >
                {project.projektBeschrieb}
            </Text>
        </animated.mesh>
    );
};

export default Cube;



// import React, { useRef, useState } from 'react';
// import { useThree } from 'react-three-fiber';
// import * as THREE from 'three';
// import { useSpring, animated } from '@react-spring/three';
// import createTexture from '../helpers/createTexture.js';
// import { Text } from '@react-three/drei';


// const Cube = ({ index, totalCubes, project, setSelectedProject }) => {

//     const meshRef = useRef();
//     const { size } = useThree();
//     const [textColor1, setTextColor1] = useState('white');


//     const edgeColor = new THREE.Color('White');
//     const cubeWidth = size.width / 50;
//     const cubeHeight = size.height / 285;
//     const cubeDepth = cubeWidth;
//     const cubeGeometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeDepth);
//     const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
//     const totalHeight = cubeHeight * totalCubes;
//     const heightBelow = cubeHeight * index;
//     const yPos = heightBelow - totalHeight / 2 + cubeHeight / 2;

//     const [{ rotation }, api] = useSpring(() => ({
//         rotation: [0, 0, 0],
//         config: {
//             mass: 15,
//             friction: 90,
//             tension: 1000,
//         },
//     }));

//     const handlePointerEnter = (event) => {
//         event.stopPropagation();
//         api.start({
//             rotation: [0, Math.PI / 4, 0],
//         });
//         setTextColor1('black');
//         setSelectedProject(project);
//         console.log(project);
//     };

//     const handlePointerLeave = (event) => {
//         event.stopPropagation();
//         api.start({
//             rotation: [0, 0, 0],
//         });
//         setTextColor1('white');
//         setSelectedProject(null);
//         console.log(project);
//     };



//     const texture1 = createTexture(project.projektTitel);
//     const texture2 = createTexture(project.projektBeschrieb);

//     return (
//         <animated.mesh
//             ref={meshRef}
//             position={[0, yPos, 0]}
//             rotation={rotation}
//             // scale={[size.width / 0,0,0]}
//         >
//             <mesh
//                 onPointerOver={(event) => handlePointerEnter(event)}
//                 onPointerOut={(event) => handlePointerLeave(event)}
//             >
//                 <primitive object={cubeGeometry} />
//                 <meshPhongMaterial color={'white'} shininess={500} />
//             </mesh>
//             <lineSegments>
//                 <primitive object={edgesGeometry} />
//                 <lineBasicMaterial color={edgeColor} />
//             </lineSegments>
//             <Text
//                 position={[-cubeWidth / 2 + 0.5, 0, cubeDepth / 2 + 0.01]}
//                 rotation={[0, 0, 0]}
//                 fontSize={cubeHeight / 4}
//                 color={textColor1}
//                 anchorX="left"
//                 anchorY="middle"
//             >
//                 {project.projektTitel}
//             </Text>
//             <Text
//                 position={[-cubeWidth / 2, 0, cubeDepth / 2 - 0.5]}
//                 rotation={[0, -1.57, 0]}
//                 fontSize={cubeHeight / 4}
//                 color="white"
//                 anchorX="right"
//                 anchorY="middle"
//             >
//                 {project.projektBeschrieb}
//             </Text>
//         </animated.mesh>
//     );
// };

// export default Cube;
