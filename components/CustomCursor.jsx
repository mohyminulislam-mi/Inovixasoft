'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth movement springs
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-brand-blue/20 rounded-full pointer-events-none z-[9999] blur-xl"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          left: -16,
          top: -16,
        }}
      />
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-blue rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(0,212,255,1)]"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          left: -4,
          top: -4,
        }}
      />
    </>
  );
};

export default CustomCursor;
