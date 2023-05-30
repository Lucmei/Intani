import React, { useEffect, useRef, useState } from 'react';
import AppDiplomCanvas from './appDiplomCanvas.js';
import TopContent from './topContent.js';
import '../src/styles/main.scss';
import { useSpring, animated } from 'react-spring';


const ThreeSidedLayout = () => {
    const [hover, setHover] = useState(false);
    const [position, setPosition] = useState('middle');
    const contentRef = useRef();
    const timeoutRef = useRef(null);
    const cursorRef = useRef(null); // create a ref to hold the cursor
    const [isLoading, setIsLoading] = useState(false);
    const defaultSize = window.innerHeight * 0.02; // 2vh
    const expandedSize = defaultSize * 2;
    const [props, set] = useSpring(() => ({ size: defaultSize }));

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsLoading(false);
    //     }, 5000);
    //     return () => clearTimeout(timer);
    // }, []);

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, []);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            window.location.reload();
        }, 60000); // 60 seconds = 1 minute
    };

    useEffect(() => {
        cursorRef.current = document.querySelector('.custom-cursor');

        if (!cursorRef.current) return;  // if no cursor is found, do nothing

        const handleMouseMove = (e) => {
            cursorRef.current.style.top = e.clientY + window.scrollY + 'px';
            cursorRef.current.style.left = e.clientX + 'px';
        };

        document.addEventListener('mousemove', handleMouseMove);

        // You should always clean up event listeners
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const cursorIcon = cursorRef.current ? cursorRef.current.querySelector('.cursor-icon') : null;
        const cursorCircle = cursorRef.current ? cursorRef.current.querySelector('.cursor-circle') : null;
        if (!cursorIcon || !cursorCircle) return;

        if (position === 'top') {
            // cursorCircle.style.display = 'none';
            cursorIcon.querySelector('.up-arrow').style.display = 'block';
            cursorIcon.querySelector('.down-arrow').style.display = 'none';
            set({ size: expandedSize });
        } else if (position === 'bottom') {
            // cursorCircle.style.display = 'none';
            cursorIcon.querySelector('.up-arrow').style.display = 'none';
            cursorIcon.querySelector('.down-arrow').style.display = 'block';
            set({ size: expandedSize });
        } else {
            // cursorCircle.style.display = 'block';
            cursorIcon.querySelector('.up-arrow').style.display = 'none';
            cursorIcon.querySelector('.down-arrow').style.display = 'none';
            set({ size: defaultSize });
        }
    }, [position, set]);

    useEffect(() => {
        resetTimeout();

        const handleMouseMove = () => {
            resetTimeout();
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [hover, position]);

    useEffect(() => {
        document.body.style.overflowY = 'hidden';

        const checkPosition = (e) => {
            if (!contentRef.current) return;

            const y = e.clientY;
            const height = window.innerHeight;
            const scrollY = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            if (y < height * 0.05 && scrollY > 0) {
                setHover(true);
                setPosition('top');
            } else if (y > height * 0.95 && scrollY < documentHeight - window.innerHeight) {
                setHover(true);
                setPosition('bottom');
            } else {
                setHover(false);
                setPosition('middle');
            }
        }

        window.addEventListener('mousemove', checkPosition);

        // const preventScroll = (e) => {
        //     // Determine whether scrolling horizontally or vertically
        //     const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
        //     const isAtTopOfPage = window.scrollY <= 20;
        //     const isAtBottomOfPage = window.scrollY >= document.documentElement.scrollHeight - window.innerHeight;

        //     // Only prevent horizontal scrolling when scrolled down past 20px and not at the bottom of the page
        //     if (isHorizontalScroll && !isAtTopOfPage && !isAtBottomOfPage) {
        //         e.preventDefault();
        //     }
        // };

        // window.addEventListener('wheel', preventScroll, { passive: false });

        return () => {
            document.body.style.overflowY = 'auto';
            window.removeEventListener('mousemove', checkPosition);
            // window.removeEventListener('wheel', preventScroll);
        };
    }, []);


    useEffect(() => {
        if (hover && contentRef.current) {
            if (position === 'top') {
                contentRef.current.style.transform = 'translateY(2%)';

            } else if (position === 'bottom') {
                contentRef.current.style.transform = 'translateY(-2%)';
            }
        } else if (contentRef.current) {
            contentRef.current.style.transform = 'translateY(0%)';

        }
    }, [hover, position]);


    const middleScrollPos = document.body.scrollHeight - window.innerHeight;
    const onClick = () => {
        if (position === 'top' && window.scrollY > middleScrollPos) {
            window.scrollTo({ top: middleScrollPos, behavior: 'smooth' });
        } else if (position === 'bottom' && window.scrollY < middleScrollPos) {
            window.scrollTo({ top: middleScrollPos, behavior: 'smooth' });
        } else if (position === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (position === 'bottom') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    };

    const fillWhite = { fill: "#000" };


    // if (isLoading) {
    //     return (
    //         <div className="loading-screen">
    //             Loading...
    //         </div>
    //     );
    // }

    return (
        <animated.div ref={contentRef} onClick={onClick} className='content'>
            <div id="mobileBlackBox">
                <h5>Apologies for the inconvenience, but this website is currently optimized for desktop interactions only.<br />Please switch to a desktop device for the best user experience.</h5>
            </div>

            <animated.div className='custom-cursor'>
                <animated.div className='cursor-circle' style={{ width: props.size, height: props.size }}>
                </animated.div>
                <div className='cursor-icon'>
                    <animated.svg
                        className="up-arrow" style={props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101.3 67.5">
                        <polygon style={fillWhite} points="50.6 50.6 101.3 67.5 50.6 0 50.6 0 0 67.5 50.6 50.6" />
                    </animated.svg>
                    <animated.svg
                        className="down-arrow" style={props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101.3 67.5">
                        <polygon style={fillWhite} points="50.6 16.9 0 0 50.6 67.5 50.6 67.5 101.3 0 50.6 16.9" />
                    </animated.svg>
                </div>
            </animated.div>
            <div className='hundred'>
                <TopContent />
            </div>
            <div className='hundred appDiplomCanvasClass'>
                <AppDiplomCanvas />
            </div>
        </animated.div >
    );
};

export default ThreeSidedLayout;
