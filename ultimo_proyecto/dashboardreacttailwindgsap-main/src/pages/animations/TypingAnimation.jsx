// src/pages/animations/TypingAnimation.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TypingAnimation() {
  const textRef = useRef();
  const cursorRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fullText = "¡Hola! Bienvenido al taller de animaciones con GSAP, React y Tailwindcss. Aquí aprenderás a crear efectos profesionales para tus dashboards empresariales.";
      let currentText = "";
      let i = 0;

      // Función para "escribir" el texto
      const typeText = () => {
        if (i < fullText.length) {
          currentText += fullText.charAt(i);
          textRef.current.textContent = currentText;
          i++;
          gsap.delayedCall(0.05, typeText); // Ajusta la velocidad aquí (0.05s por carácter)
        } else {
          // Parpadear el cursor al terminar
          gsap.to(cursorRef.current, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
          });
        }
      };

      // Iniciar la animación
      typeText();

      return () => {
        // Limpiar si el componente se desmonta
      };
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Contenedor del Texto Animado */}
      <div className="bg-gray-900 text-green-400 p-8 rounded-xl font-mono text-lg md:text-xl leading-relaxed">
        <div className="flex items-start">
          <span className="mr-3 text-green-500">$</span>
          <span ref={textRef} className="whitespace-pre-wrap"></span>
          <span 
            ref={cursorRef} 
            className="inline-block w-2 h-6 bg-green-400 ml-1 animate-pulse"
          ></span>
        </div>
      </div>

      {/* Descripción de la Animación */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">⌨️ Efecto "Typing" con GSAP</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Este efecto simula que alguien está escribiendo el texto en tiempo real, 
          como en una terminal o editor de código. El cursor parpadea al finalizar.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Técnicas usadas:</span>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-1">
              <li>gsap.delayedCall() para controlar el ritmo</li>
              <li>Manipulación de textContent</li>
              <li>Animación de cursor con gsap.to()</li>
            </ul>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Personalización:</span>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-1">
              <li>Cambia la velocidad ajustando el delay</li>
              <li>Modifica el texto completo</li>
              <li>Cambia los colores y estilos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}