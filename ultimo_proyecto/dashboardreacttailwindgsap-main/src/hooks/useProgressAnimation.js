// src/hooks/useProgressAnimation.js
//✅ Anima barras de progreso de 0% al valor final. 
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useProgressAnimation = (value, duration = 1.2) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { width: 0 },
        {
          width: `${value}%`,
          duration,
          ease: "power2.out"
        }
      );
    }
  }, [value, duration]);

  return ref;
};