
import React, { useState, useMemo } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import OrthographicCam from './react_modules/elements/OrthographicCam.js';
import Plane from './react_modules/elements/Plane.js';
import Cube from './react_modules/elements/Cube.js';
import ContentCube from './react_modules/elements/ContentCube.js';
import RaycasterContext from '../src/react_modules/hooks/raycasterContext.js';
import RaycasterController from './react_modules/hooks/RaycasterController.js';

const CanvasContainer = ({ projects, setSelectedProject, selectedProject }) => {
  const totalCubes = projects.length;
  const { mouse } = useThree();

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const [intersections, setIntersections] = useState([]);

  return (
    <RaycasterContext.Provider value={{ raycaster, intersections, setIntersections }}>
      <div className="totalWrapper">
        <Canvas className="menuWrapper">
          <OrthographicCam />
          <RaycasterController mouse={mouse} />
          <Plane />
          <directionalLight position={[10, 0, 0]} intensity={10} />
          {Array.from({ length: totalCubes }, (_, i) => (
            <Cube
              index={i}
              totalCubes={totalCubes}
              key={i}
              project={projects[i]}
              setSelectedProject={setSelectedProject}
            />
          ))}
        </Canvas>
        <Canvas className="contentWrapper">
          <OrthographicCam />
          <RaycasterController mouse={mouse} />
          <ContentCube
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
          <directionalLight position={[0, 100, 0]} intensity={5} />
        </Canvas>
      </div>
    </RaycasterContext.Provider>
  );
};

export default CanvasContainer;
