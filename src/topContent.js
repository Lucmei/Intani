import React, { useState, useEffect } from 'react';
import '../src/styles/main.scss';
import img from '../public/assets/imgs/sphereImgInv.jpg';
import imgCenter from '../public/assets/imgs/sphereImg.jpg';


const TopContent = () => {
  const gridItems = [];
  const gridItemsOutside = [];
  const [clicked, setClicked] = useState(false);
  const [animationState, setAnimationState] = useState({ phase: 'initial' });
  const [moveStates, setMoveStates] = useState({
    upMovement: '',
    leftMovement: '',
    rightMovement: '',
    downMovement: '',
    zIndexMovement: '',

    // Add any other elements you want to track here
  });

  const handleClick = () => {
    setMoveStates(prevState => {
      let newState = { ...prevState };

      switch (newState.upMovement) {
        case '':
          newState.upMovement = 'move-up';
          break;
        case 'move-up':
          newState.upMovement = 'move-original';
          break;
        case 'move-original':
          newState.upMovement = 'move-up';
          break;
        default:
          newState.upMovement = '';
      }

      switch (newState.downMovement) {
        case '':
          newState.downMovement = 'move-down';
          break;
        case 'move-down':
          newState.downMovement = 'move-original';
          break;
        case 'move-original':
          newState.downMovement = 'move-down';
          break;
        default:
          newState.downMovement = '';
      }

      switch (newState.rightMovement) {
        case '':
          newState.rightMovement = 'move-right';
          break;
        case 'move-right':
          newState.rightMovement = 'move-original';
          break;
        case 'move-original':
          newState.rightMovement = 'move-right';
          break;
        default:
          newState.rightMovement = '';
      }

      switch (newState.leftMovement) {
        case '':
          newState.leftMovement = 'move-left';
          break;
        case 'move-left':
          newState.leftMovement = 'move-original';
          break;
        case 'move-original':
          newState.leftMovement = 'move-left';
          break;
        default:
          newState.leftMovement = '';
      }

      switch (newState.zIndexMovement) {
        case '':
          newState.zIndexMovement = 'move-zIndex';
          break;
        case 'move-zIndex':
          newState.zIndexMovement = 'move-zIndexOriginal';
          break;
        case 'move-zIndexOriginal':
          newState.zIndexMovement = 'move-zIndex';
          break;
        default:
          newState.zIndexMovement = 'move-zIndexOriginal';
      }

      return newState;
    });
  }

  for (let i = 0; i < 15; i++) {
    gridItemsOutside.push(
      <div className="grid-item-left" key={`outside-${i}`}>
        <div className="circle-left"></div>
      </div>
    );
  }
  for (let i = 0; i < 15; i++) {
    gridItems.push(
      <div className="grid-item" key={`inside-${i}`}>
        <div className="circle"></div>
      </div>
    );
  }
  for (let i = 0; i < 15; i++) {
    gridItemsOutside.push(
      <div className="grid-item-right" key={`outside-${i + 15}`}>
        <div className="circle-right"></div>
      </div>
    );
  }

  return (
    <div id="topContentDiv">
      {/* <div id="topContentDivInhalt">
        <h1>Side Top</h1>
        <p>This is the content for Side A of the rectangle.</p>
      </div> */}
      <div className="grid-container-left">
        {gridItemsOutside}
      </div>
      <div className="grid-container-center">
        <img src={img} className={moveStates.rightMovement} />
        <img src={img} className={moveStates.upMovement} />
        <img src={img} className={moveStates.upMovement} />
        <img src={img} className={moveStates.upMovement} />
        <img src={img} className={moveStates.leftMovement} />
        <img src={img} className={moveStates.rightMovement} />
        <img src={img} className={moveStates.leftMovement} />
        <img src={imgCenter} className='centerImage' onClick={handleClick} />
        <img src={img} className={moveStates.rightMovement} />
        <img src={img} className={moveStates.leftMovement} />
        <img src={img} className={moveStates.rightMovement} />
        <img src={img} className={moveStates.downMovement} />
        <img src={img} className={moveStates.downMovement} />
        <img src={img} className={moveStates.downMovement} />
        <img src={img} className={moveStates.leftMovement} />
        <div id='beschriebOfProjectOnTop' className={moveStates.zIndexMovement} >
          <h5>
            Transitioning from traditional print-based design to the dynamic sphere of web design necessitates a radical shift in perspective. Web design offers us the latitude to craft flexible, immersive, and personalized user experiences, where animated elements constitute just a part of the enthralling narrative. It empowers us to sculpt interactive experiences that encompass more than just on-screen animations, extending to the orchestration of these animations, and even better, facilitating user engagement in manipulating and controlling these on-screen movements.<br /><br />

            Appreciating the distinction between simply creating an animation and designing an interactive experience - where animation is a reactive component - has profoundly transformed my digital design philosophy. <br /><br />

            This website serves as a graphical manifestation of this transformative realization.
          </h5>
        </div>
        <div id="ofProjectWrapper">
          <div id='titelOfProject'>
            <h1>INT&gt;ANI</h1>
          </div>
          <div id='beschriebOfProject'>
            <h5>
              Transitioning from traditional print-based design to the dynamic sphere of web design necessitates a radical shift in perspective. Web design offers us the latitude to craft flexible, immersive, and personalized user experiences, where animated elements constitute just a part of the enthralling narrative. It empowers us to sculpt interactive experiences that encompass more than just on-screen animations, extending to the orchestration of these animations, and even better, facilitating user engagement in manipulating and controlling these on-screen movements.<br /><br />

              Appreciating the distinction between simply creating an animation and designing an interactive experience - where animation is a reactive component - has profoundly transformed my digital design philosophy. <br /><br />

              This website serves as a graphical manifestation of this transformative realization.
            </h5>
          </div>
          <div id='githubOfProject' >
            <h6>Github</h6>
          </div>
          <div id='guideOfProject' >
            <h6>Input: <br />Mouse,<br /> MouseKlick, <br />Spacebar, <br />Arrowkeys</h6>
          </div>
        </div>
      </div>

      <div className="grid-container-right">
        {gridItemsOutside}
      </div>
    </div>
  );
};

export default TopContent;
