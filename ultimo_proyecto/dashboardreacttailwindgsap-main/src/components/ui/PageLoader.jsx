// src/components/ui/PageLoader.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader({ isLoading }) {
  const loaderRef = useRef();

  useEffect(() => {
    if (isLoading) {
      // Mostrar loader con animación
      gsap.fromTo(
        loaderRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      // Ocultar loader con animación
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          // Opcional: ocultar del DOM
          loaderRef.current.style.display = 'none';
        }
      });
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Cargando...</p>
      </div>
    </div>
  );
}