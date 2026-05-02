'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView, motion, useSpring, useTransform } from 'motion/react';

const AnimatedCounter = ({ value, label, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
        <span className="text-gradient">{count}</span>{suffix}
      </div>
      <div className="text-sm font-bold uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">
        {label}
      </div>
    </div>
  );
};

export default AnimatedCounter;
