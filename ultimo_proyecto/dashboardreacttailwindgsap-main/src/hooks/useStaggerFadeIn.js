// src/hooks/useStaggerFadeIn.js
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const useStaggerFadeIn = (duration = 0.6, stagger = 0.2) => {
  const ref = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.children, {
        opacity: 0,
        y: 30,
        duration,
        stagger,
        ease: "power2.out"
      });
    }, ref);

    return () => ctx.revert();
  }, [duration, stagger]);

  return ref;
}