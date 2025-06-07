import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice || isTouchDevice);
    };
    
    checkMobile();
  }, []);

  useEffect(() => {
    // Don't initialize cursor on mobile devices
    if (isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('button') || 
          target.closest('a') ||
          target.classList.contains('cursor-pointer') ||
          target.style.cursor === 'pointer') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';
    
    // Add CSS to hide cursor on all elements
    const style = document.createElement('style');
    style.innerHTML = `
      *, *:before, *:after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
      // Remove the style element
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [isMobile]);

  return (
    <>
      {/* Don't render custom cursor on mobile devices */}
      {!isMobile && (
        <>
          {/* Main cursor dot */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            animate={{
              x: position.x - 6,
              y: position.y - 6,
              scale: isClicking ? 0.8 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 1000,
              damping: 35,
              mass: 0.5,
            }}
          >
            <div 
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                isHovering 
                  ? 'bg-white shadow-lg shadow-white/50' 
                  : 'bg-[#5BC0BE] shadow-lg shadow-[#5BC0BE]/50'
              }`} 
            />
          </motion.div>

          {/* Outer ring */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            animate={{
              x: position.x - 16,
              y: position.y - 16,
              scale: isHovering ? 1.5 : 1,
              opacity: isClicking ? 0.3 : 0.6,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.8,
            }}
          >
            <div 
              className={`w-8 h-8 rounded-full border transition-all duration-300 ${
                isHovering 
                  ? 'border-white border-2' 
                  : 'border-[#5BC0BE] border-1'
              }`} 
            />
          </motion.div>
        </>
      )}
    </>
  );
};

export default CustomCursor; 