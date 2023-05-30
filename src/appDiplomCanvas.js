import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import Scene1 from './react_modules/elementsDiplom/scene1.js';
import Scene2 from './react_modules/elementsDiplom/scene2.js';
import Scene3 from './react_modules/elementsDiplom/scene3.js';
import Scene4 from './react_modules/elementsDiplom/scene4.js';
import Scene5 from './react_modules/elementsDiplom/scene5.js';
import Scene6 from './react_modules/elementsDiplom/scene6.js';
import Scene7 from './react_modules/elementsDiplom/scene7.js';
import Scene9 from './react_modules/elementsDiplom/Scene9.js';
import Scene10 from './react_modules/elementsDiplom/scene10.js';
import Scene11 from './react_modules/elementsDiplom/scene11.js';
import Scene12 from './react_modules/elementsDiplom/scene12.js';
import Scene13 from './react_modules/elementsDiplom/scene13.js';
import Scene14 from './react_modules/elementsDiplom/scene14.js';
import Scene15 from './react_modules/elementsDiplom/scene15.js';
import Scene16 from './react_modules/elementsDiplom/scene16.js';
import Scene17 from './react_modules/elementsDiplom/scene17.js';
import Scene18 from './react_modules/elementsDiplom/scene18.js';
import BackgroundCircles from './react_modules/elementsDiplom/backgroundCircles.js';

const AppDiplomCanvas = () => {
  const [inverterPosition, setInverterPosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const inverterRef = useRef();
  const scene8Ref = useRef(null);
  const [mouseIsOverCanvas, setMouseIsOverCanvas] = useState(false);
  const [mouseIsOverCanvas18, setMouseIsOverCanvas18] = useState(false);
  const [mouseIsOverCanvas15, setMouseIsOverCanvas15] = useState(false);

  const resetTimerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  window.addEventListener("keydown", function (e) {
    if (["ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  }, false);

  useEffect(() => {
    const handleResize = () => {
      handleMouseUp();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    const container = document.querySelector(".appDiplomCanvasClass");

    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }

    const handleScroll = (event) => {
      const newScrollPosition = {
        x: container.scrollLeft,
        y: container.scrollTop
      };

      if (newScrollPosition.x !== scrollPosition.x || newScrollPosition.y !== scrollPosition.y) {
        setIsScrolling(true);
        setScrollPosition(newScrollPosition);
        setTimeout(() => {
          setIsScrolling(false);
        }, 50);
      }
    };


    window.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (inverterRef.current && inverterRef.current.contains(e.target)) {
      setDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setInverterPosition({
        x: e.clientX - cursorOffset.x + scrollPosition.x,
        y: e.clientY - cursorOffset.y + scrollPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const initialLightIntensity = 0;
  const initialBoxPosition1 = [-3, -21, -13];
  const initialBoxPosition2 = [3, -21, -20];
  const initialBoxPosition3 = [0, -16, -15];
  const initialBoxPosition4 = [-3, -12, -23];
  const initialBoxPosition5 = [3, -12, -20];
  const initialBoxPosition6 = [0, -8, -10];
  const initialRoofPosition7 = [-4, -21, -15.];
  const initialRoofPosition8 = [4, -21, -10.];
  const initialSpherePosition9 = [0, -23.4, 0];

  const [lightIntensity, setLightIntensity] = useState(initialLightIntensity);
  const [BoxPosition1, setBoxPosition1] = useState(initialBoxPosition1);
  const [BoxPosition2, setBoxPosition2] = useState(initialBoxPosition2);
  const [BoxPosition3, setBoxPosition3] = useState(initialBoxPosition3);
  const [BoxPosition4, setBoxPosition4] = useState(initialBoxPosition4);
  const [BoxPosition5, setBoxPosition5] = useState(initialBoxPosition5);
  const [BoxPosition6, setBoxPosition6] = useState(initialBoxPosition6);
  const [RoofPosition7, setRoofPosition7] = useState(initialRoofPosition7);
  const [RoofPosition8, setRoofPosition8] = useState(initialRoofPosition8);
  const [SpherePosition9, setSpherePosition9] = useState(initialSpherePosition9);


  const handleMouseEnter = (event) => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    setMouseIsOverCanvas(true);
  };

  const handleMouseLeave = (event) => {
    handleMouseUp();
    resetTimerRef.current = setTimeout(() => {
      setMouseIsOverCanvas(false);
      setLightIntensity(initialLightIntensity);
      setBoxPosition1(initialBoxPosition1);
      setBoxPosition2(initialBoxPosition2);
      setBoxPosition3(initialBoxPosition3);
      setBoxPosition4(initialBoxPosition4);
      setBoxPosition5(initialBoxPosition5);
      setBoxPosition6(initialBoxPosition6);
      setRoofPosition7(initialRoofPosition7);
      setRoofPosition8(initialRoofPosition8);
      setSpherePosition9(initialSpherePosition9);
    }, 2000);
  };

  useEffect(() => {
    if (!mouseIsOverCanvas) {
      setLightIntensity(0);
    }
  }, [mouseIsOverCanvas]);
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>


      <div
        className='appDiplomCanvasLeft'
        style={{
          display: 'grid',
          zIndex: '1000',
          width: 'calc(5 * 33.33333vh)',
          height: '100vh',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(33.3333333vh,33.33333vh))',
            width: 'calc(5 * 33.33333vh)',
            height: '100vh',
          }}>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
        </div>
      </div>

      <div
        className='appDiplomCanvasClass'
        style={{
          zIndex: '1000',
          width: 'calc(5 * 33.33333vh)',
          height: '100vh',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(33.3333333vh,33.33333vh))',
            width: 'calc(5 * 33.33333vh)',
            height: '100vh',
            transition: 'background-color 0.5s',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >

          <Canvas style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene7 />
          </Canvas>


          <Canvas style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene3 />
          </Canvas>

          <Canvas shadows style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene5 layer={1} />
          </Canvas>
          <Canvas style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene2 />
          </Canvas>

          {/*         
      <div
      ref={inverterRef}
      style={{
        position: 'absolute',
        width: '33.33333vh',
        height: '33.33333vh',
        zIndex: 999,
        pointerEvents: dragging ? 'none' : 'auto',
        top: `${inverterPosition.y}px`,
        left: `${inverterPosition.x}px`,
        transition: dragging || isScrolling ? 'none' : 'top 0.5s, left 0.5s',
      }}
      >
      <Canvas style={{ width: '100%', height: '100%' }}>
      <mesh position={[0, 0, -10]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color={0x000000} />
      </mesh>
      <mesh position={[0, 0, 0]}>
      <circleGeometry args={[1, 64, 32]} />
      <meshBasicMaterial color={0xffffff} />
      </mesh>
      </Canvas>
      </div>
      <div
      style={{
        position: 'relative',
        width: '33.33333vh',
        height: '33.33333vh',
      }}
      >
      <img
      src="/public/assets/imgs/malisScene8.jpg"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 2,
      }}
      />
      <Canvas
      ref={scene8Ref}
      style={{
        width: '33.33333vh',
        height: '33.33333vh',
        zIndex: 1,
      }}
      >
      </Canvas>
    </div> */}

          <Canvas onPointerOver={() => setMouseIsOverCanvas(true)} onPointerOut={() => setMouseIsOverCanvas(false)} style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene9
              lightIntensity={lightIntensity}
              setLightIntensity={setLightIntensity}
              BoxPosition1={BoxPosition1}
              setBoxPosition1={setBoxPosition1}
              BoxPosition2={BoxPosition2}
              setBoxPosition2={setBoxPosition2}
              BoxPosition3={BoxPosition3}
              setBoxPosition3={setBoxPosition3}
              BoxPosition4={BoxPosition4}
              setBoxPosition4={setBoxPosition4}
              BoxPosition5={BoxPosition5}
              setBoxPosition5={setBoxPosition5}
              BoxPosition6={BoxPosition6}
              setBoxPosition6={setBoxPosition6}
              RoofPosition7={RoofPosition7}
              setRoofPosition7={setRoofPosition7}
              RoofPosition8={RoofPosition8}
              setRoofPosition8={setRoofPosition8}
              SpherePosition9={SpherePosition9}
              setSpherePosition9={setSpherePosition9}
            />
          </Canvas>

          <Canvas onPointerOver={() => setMouseIsOverCanvas(true)} onPointerOut={() => setMouseIsOverCanvas(false)} style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene10 />
          </Canvas>

          <Canvas style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene11 />
          </Canvas>

          <Canvas style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene6 />
          </Canvas>

          <Canvas style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene4 />
          </Canvas>

          <Canvas onPointerOver={() => setMouseIsOverCanvas(true)} onPointerOut={() => setMouseIsOverCanvas(false)} style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene12 />
          </Canvas>
          <Canvas style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene1 />
          </Canvas>

          {/* <Canvas style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene13/>
          </Canvas> */}

          <Canvas style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene17 />
          </Canvas>


          <Canvas
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
          >
            <Scene14 isHovered={isHovered} />
          </Canvas>

          <div onPointerOver={() => setMouseIsOverCanvas18(true)} onPointerOut={() => setMouseIsOverCanvas18(false)} style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene18 mouseIsOverCanvas18={mouseIsOverCanvas18} />
          </div>

          <Canvas onPointerOver={() => setMouseIsOverCanvas15(true)} onPointerOut={() => setMouseIsOverCanvas15(false)} style={{ width: '33.33333vh', height: '33.33333vh' }}>
            <Scene16 mouseIsOverCanvas15={mouseIsOverCanvas15} />
          </Canvas>

        </div>
      </div>

      <div
        className='appDiplomCanvasRight'
        style={{
          display: 'grid',
          zIndex: '1000',
          width: 'calc(5 * 33.33333vh)',
          height: '100vh',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(33.3333333vh,33.33333vh))',
            width: 'calc(5 * 33.33333vh)',
            height: '100vh',
          }}>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
          <Canvas>
            <BackgroundCircles />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default AppDiplomCanvas;