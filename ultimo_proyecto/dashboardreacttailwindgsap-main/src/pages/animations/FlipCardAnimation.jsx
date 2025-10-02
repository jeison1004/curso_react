// src/pages/animations/FlipCardAnimation.jsx
import { useRef } from 'react';
import gsap from 'gsap';
import FlipCardHorizontal from './FlipCardHorizontal';


export default function FlipCardAnimation() {
  const cardRef = useRef();

  const flipCard = () => {
    const currentRotation = gsap.getProperty(cardRef.current, "rotateY");
    gsap.to(cardRef.current, {
      rotateY: currentRotation === 0 ? 180 : 0,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Primera Tarjeta (Flip Vertical) */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          🎴 Flip Card (Eje Y)
        </h2>
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className="w-80 h-96 [perspective:1000px] cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
            onClick={flipCard}
          >
            {/* Cara Frontal */}
            <div className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg flex flex-col items-center justify-center text-white [backface-visibility:hidden]">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                  💡
                </div>
                <h3 className="text-2xl font-bold mb-4">¿Sabías que...?</h3>
                <p className="text-lg mb-6">
                  GSAP es la librería de animación más potente para JavaScript.
                </p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  ¡Voltear!
                </button>
              </div>
            </div>

            {/* Cara Trasera */}
            <div 
              className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-green-500 to-teal-600 shadow-lg flex flex-col items-center justify-center text-white [backface-visibility:hidden]"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                  🚀
                </div>
                <h3 className="text-2xl font-bold mb-4">¡Descúbrelo!</h3>
                <p className="text-lg mb-6">
                  Con GSAP puedes crear animaciones complejas, sincronizadas y de alto rendimiento.
                </p>
                <button className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  ¡Voltear!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda Tarjeta (Flip Horizontal) */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          🎴 Flip Card (Eje X)
        </h2>
        <FlipCardHorizontal />
      </div>



      {/* Descripción de la Animación */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
          🎴 Tarjetas "Flip" con GSAP
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Estas tarjetas giran en diferentes ejes (Y y X) al hacer clic, revelando su cara trasera. 
          Las animaciones se controlan con GSAP, que maneja la rotación en 3D.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Técnicas usadas:</span>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-1">
              <li>gsap.to() para animar rotateY y rotateX</li>
              <li>transform-style: preserve-3d</li>
              <li>backface-visibility: hidden</li>
            </ul>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Personalización:</span>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-1">
              <li>Cambia los colores y contenidos de las caras</li>
              <li>Ajusta la duración y easing de la animación</li>
              <li>Experimenta con diferentes ejes de rotación</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}