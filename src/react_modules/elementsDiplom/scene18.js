import React, { useEffect, useRef } from 'react';
import vid from '../../../public/assets/imgs/scene18.mp4';

const Scene18 = ({ mouseIsOverCanvas18 }) => {
  const videoRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === ' ' && mouseIsOverCanvas18) {
      videoRef.current.style.opacity = 1;
      videoRef.current.play();
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoEnded = () => {
      videoElement.style.opacity = 1;
    };

    videoElement.addEventListener('ended', handleVideoEnded);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnded);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mouseIsOverCanvas18]);

  useEffect(() => {
    if (!mouseIsOverCanvas18) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [mouseIsOverCanvas18]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <video
        id="video"
        ref={videoRef}
        src={vid}
        style={{ position: 'absolute', width: '100%', height: '100%', opacity: 1 }}
      />
    </div>
  );
};

export default Scene18;
