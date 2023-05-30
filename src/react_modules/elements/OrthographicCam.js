import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';


const OrthographicCam = (props) => {
    const cameraRef = useRef();
    const { set, size } = useThree();
  
    useEffect(() => {
      set(() => ({ camera: cameraRef.current }));
    }, []);
  
    useFrame(() => {
      const aspectRatio = size.width / size.height;
      const zoom = 0.014;
      cameraRef.current.left = -zoom * size.width;
      cameraRef.current.right = zoom * size.width;
      cameraRef.current.top = zoom * size.height;
      cameraRef.current.bottom = -zoom * size.height;
      cameraRef.current.updateProjectionMatrix();
    });
  
    return (
      <orthographicCamera
        ref={cameraRef}
        position={[0, 0, 30]}
        near={0.1}
        far={1000}
        {...props}
      />
    );
  };

  export default OrthographicCam;