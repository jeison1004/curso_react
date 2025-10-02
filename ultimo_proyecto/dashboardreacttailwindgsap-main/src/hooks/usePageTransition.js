// src/hooks/usePageTransition.js
/*
¿Qué hace? 

Al montar la página: anima desde abajo y fade-in.
Al desmontar (al navegar a otra página): anima hacia arriba y fade-out.

*/
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export const usePageTransition = () => {
  const ref = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      // Animación de salida (opcional, se ejecuta al desmontar)
      return () => {
        gsap.to(ref.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: "power2.in"
        });
      };
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};