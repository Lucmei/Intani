import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import OrthographicCam from './react_modules/elements/OrthographicCam.js';
import Plane from './react_modules/elements/Plane.js';
import Cube from './react_modules/elements/Cube.js';
import ContentCube from './react_modules/elements/ContentCube.js';

import project1 from './react_modules/projects/Project1.js';
import project2 from './react_modules/projects/Project2.js';
import project3 from './react_modules/projects/Project3.js';
import project4 from './react_modules/projects/Project4.js';
import project5 from './react_modules/projects/Project5.js';
import project6 from './react_modules/projects/Project6.js';
import project7 from './react_modules/projects/Project7.js';
import project8 from './react_modules/projects/Project8.js';

const projects = [project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  project7,
  project8
];

const App = () => {
  const totalCubes = 8;
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className='totalWrapper'>
      <Canvas className='menuWrapper'>
        <OrthographicCam />
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

      <Canvas className='contentWrapper'>
        <OrthographicCam />
        <ContentCube
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <directionalLight position={[0, 100, 0]} intensity={5} />
      </Canvas>
    </div>
  );
};

export default App;

// import React, { useState } from 'react';
// import { Canvas } from 'react-three-fiber';
// import OrthographicCam from './react_modules/elements/OrthographicCam.js';
// import Plane from './react_modules/elements/Plane.js';
// import Cube from './react_modules/elements/Cube.js';
// import ContentCube from './react_modules/elements/ContentCube.js';

// import project1 from './react_modules/projects/Project1.js';
// import project2 from './react_modules/projects/Project2.js';
// import project3 from './react_modules/projects/Project3.js';
// import project4 from './react_modules/projects/Project4.js';
// import project5 from './react_modules/projects/Project5.js';
// import project6 from './react_modules/projects/Project6.js';
// import project7 from './react_modules/projects/Project7.js';
// import project8 from './react_modules/projects/Project8.js';

// const projects = [
//   project1,
//   project2,
//   project3,
//   project4,
//   project5,
//   project6,
//   project7,
//   project8,
// ];

// const App = () => {
//   const totalCubes = 8;
//   const [selectedProject, setSelectedProject] = useState(null);

//   return (
//     <div className="totalWrapper">
//       <Canvas className="combinedWrapper">
//         <OrthographicCam />
//         <Plane />
//         <directionalLight position={[10, 0, 0]} intensity={10} />
//         {Array.from({ length: totalCubes }, (_, i) => (
//           <Cube
//             index={i}
//             totalCubes={totalCubes}
//             key={i}
//             project={projects[i]}
//             setSelectedProject={setSelectedProject}
//           />
//         ))}
//         <ContentCube
//           selectedProject={selectedProject}
//           setSelectedProject={setSelectedProject}
//         />
//         <directionalLight position={[0, 100, 0]} intensity={5} />
//       </Canvas>
//     </div>
//   );
// };

// export default App;
