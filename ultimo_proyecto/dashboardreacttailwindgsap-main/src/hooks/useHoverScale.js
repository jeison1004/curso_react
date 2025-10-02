// src/hooks/useHoverScale.js
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const useHoverScale = () => {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;

    // 👇 Verifica que el elemento exista
    if (!element) return;

    const onEnter = () => {
      gsap.to(element, {
        scale: 1.03,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const onLeave = () => {
      gsap.to(element, {
        scale: 1,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);

    return () => {
      element.removeEventListener('mouseenter', onEnter);
      element.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return ref;
};