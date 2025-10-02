// src/hooks/useFadeIn.js
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const useFadeIn = (duration = 0.6, delay = 0) => {
  const ref = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 20,
        duration,
        delay,
        ease: "power2.out"
      });
    }, ref);

    return () => ctx.revert();
  }, [duration, delay]);

  return ref;
};