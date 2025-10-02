// src/components/animations/FlipCardHorizontal.jsx
import { useRef } from 'react';
import gsap from 'gsap';

export default function FlipCardHorizontal() {
  const cardRef = useRef();

  const flipCard = () => {
    const currentRotation = gsap.getProperty(cardRef.current, "rotateX");
    gsap.to(cardRef.current, {
      rotateX: currentRotation === 0 ? 180 : 0,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={cardRef}
      className="w-80 h-96 [perspective:1000px] cursor-pointer mx-auto"
      style={{ transformStyle: 'preserve-3d' }}
      onClick={flipCard}
    >
      {/* Cara Frontal */}
      <div className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg flex flex-col items-center justify-center text-white [backface-visibility:hidden]">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
            🎯
          </div>
          <h3 className="text-2xl font-bold mb-4">¿Listo para el reto?</h3>
          <p className="text-lg mb-6">
            Desafía tus habilidades con animaciones avanzadas.
          </p>
          <button className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            ¡Voltear!
          </button>
        </div>
      </div>

      {/* Cara Trasera */}
      <div 
        className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg flex flex-col items-center justify-center text-white [backface-visibility:hidden]"
        style={{ transform: 'rotateX(180deg)' }}
      >
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
            🏆
          </div>
          <h3 className="text-2xl font-bold mb-4">¡Lo lograste!</h3>
          <p className="text-lg mb-6">
            Has dominado las animaciones 3D con GSAP.
          </p>
          <button className="bg-white text-yellow-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            ¡Voltear!
          </button>
        </div>
      </div>
    </div>
  );
}