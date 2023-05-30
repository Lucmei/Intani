import React, { useRef } from 'react';
import { useFrame, createPortal, useThree } from 'react-three-fiber';
import OrthographicCamera from './react_modules/elementsDiplom/OrthographicCamera.js';


const Viewport = ({ x, y, width, height, children }) => {
  const { gl, scene, size } = useThree();

  const viewportRef = useRef();
  useThree(() => {
    if (!viewportRef.current) return;

    const camera = viewportRef.current.children[0];
    gl.setViewport(x * size.width, y * size.height, width * size.width, height * size.height);
    gl.render(scene, camera);
  });

  return createPortal(
    <>
      <OrthographicCamera x={x} y={y} width={width} height={height} ref={viewportRef} />
      {children}
    </>,
    scene
  );
};

export default Viewport;
