import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, DoubleSide, PlaneGeometry, MeshBasicMaterial } from 'three';


import Image1 from '../../../public/assets/imgs/fotosScene10/img_1.jpg';
import Image2 from '../../../public/assets/imgs/fotosScene10/img_2.jpg';
import Image3 from '../../../public/assets/imgs/fotosScene10/img_3.jpg';
import Image4 from '../../../public/assets/imgs/fotosScene10/img_4.jpg';
import Image5 from '../../../public/assets/imgs/fotosScene10/img_5.jpg';
import Image6 from '../../../public/assets/imgs/fotosScene10/img_6.jpg';
import Image7 from '../../../public/assets/imgs/fotosScene10/img_7.jpg';
import Image8 from '../../../public/assets/imgs/fotosScene10/img_8.jpg';
import Image9 from '../../../public/assets/imgs/fotosScene10/img_9.jpg';
import Image10 from '../../../public/assets/imgs/fotosScene10/img_10.jpg';
import Image11 from '../../../public/assets/imgs/fotosScene10/img_11.jpg';
import Image12 from '../../../public/assets/imgs/fotosScene10/img_12.jpg';
import Image13 from '../../../public/assets/imgs/fotosScene10/img_13.jpg';
import Image14 from '../../../public/assets/imgs/fotosScene10/img_14.jpg';
import Image15 from '../../../public/assets/imgs/fotosScene10/img_15.jpg';
import Image16 from '../../../public/assets/imgs/fotosScene10/img_16.jpg';
import Image17 from '../../../public/assets/imgs/fotosScene10/img_17.jpg';
import Image18 from '../../../public/assets/imgs/fotosScene10/img_18.jpg';
import Image19 from '../../../public/assets/imgs/fotosScene10/img_19.jpg';
import Image20 from '../../../public/assets/imgs/fotosScene10/img_20.jpg';
import Image21 from '../../../public/assets/imgs/fotosScene10/img_21.jpg';

const ImagesCircle = [
  Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8,
  Image9, Image10, Image11, Image12, Image13, Image14, Image15, Image16,
  Image17, Image18, Image19, Image20, Image21,];



const Scene10 = () => {
  const [mouseIsOverCanvas, setMouseIsOverCanvas] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [keyPressed, setKeyPressed] = useState(false);
  const texture = useLoader(TextureLoader, ImagesCircle[currentImageIndex]);
  const { size } = useThree();

  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.map = texture;
    }
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space' && !keyPressed && mouseIsOverCanvas) {
        setKeyPressed(true);
        setIsVisible(true);
        const nextImageIndex = (currentImageIndex + 1) % ImagesCircle.length;
        setCurrentImageIndex(nextImageIndex);
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Space') {
        setKeyPressed(false);
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentImageIndex, keyPressed, mouseIsOverCanvas]);

  return (
    <mesh
      onPointerOver={() => setMouseIsOverCanvas(true)}
      onPointerOut={() => setMouseIsOverCanvas(false)}
    >
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[size.width / 2, size.height / 2]} />
        <meshBasicMaterial color="black" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <circleGeometry
          args={[1, 64, 2]}
        />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh ref={meshRef} position={[0, 0, 1]} visible={isVisible}>
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial map={texture} side={DoubleSide} />
      </mesh>
    </mesh>
  );
};

export default Scene10;

