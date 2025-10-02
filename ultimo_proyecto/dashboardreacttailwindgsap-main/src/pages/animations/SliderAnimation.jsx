// src/pages/animations/SliderAnimation.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SliderAnimation() {
  const sliderRef = useRef();
  const slidesRef = useRef([]);
  const dotsRef = useRef([]);
  const eventHandlersRef = useRef([]); // 👈 Guarda las funciones de evento
  const currentSlide = useRef(0);
  const totalSlides = 3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación inicial: mostrar primer slide
      gsap.set(slidesRef.current, { x: '100%', opacity: 0 });
      gsap.set(slidesRef.current[0], { x: 0, opacity: 1 });

      // Función para cambiar de slide
      const goToSlide = (index) => {
        if (index === currentSlide.current) return;

        // Actualizar puntos activos
        dotsRef.current.forEach((dot, i) => {
          dot.classList.toggle('bg-blue-600', i === index);
          dot.classList.toggle('bg-gray-300', i !== index);
        });

        // Animar slide actual (salida)
        gsap.to(slidesRef.current[currentSlide.current], {
          x: '-100%',
          opacity: 0,
          duration: 0.6,
          ease: "power2.in"
        });

        // Animar nuevo slide (entrada)
        gsap.fromTo(slidesRef.current[index], {
          x: '100%',
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        });

        currentSlide.current = index;
      };

      // Auto-avanzar cada 4 segundos
      const interval = setInterval(() => {
        const nextIndex = (currentSlide.current + 1) % totalSlides;
        goToSlide(nextIndex);
      }, 4000);

      // Event listeners para los puntos
      eventHandlersRef.current = []; // 👈 Limpia el array
      dotsRef.current.forEach((dot, index) => {
        const handler = () => goToSlide(index); // 👈 Crea la función
        eventHandlersRef.current.push(handler); // 👈 Guárdala
        dot.addEventListener('click', handler);
      });

      return () => {
        clearInterval(interval);
        // 👇 Remueve los event listeners correctamente
        dotsRef.current.forEach((dot, index) => {
          if (dot && eventHandlersRef.current[index]) {
            dot.removeEventListener('click', eventHandlersRef.current[index]);
          }
        });
      };
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Contenedor del Slider */}
      <div 
        ref={sliderRef}
        className="relative h-80 md:h-96 rounded-xl overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
      >
        {/* Slides */}
        <div className="absolute inset-0">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              ref={el => slidesRef.current[index] = el}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center text-white p-8">
                <h3 className="text-4xl md:text-5xl font-bold mb-4">
                  {index === 0 && '🚀 Innovación'}
                  {index === 1 && '💡 Creatividad'}
                  {index === 2 && '⚡ Velocidad'}
                </h3>
                <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto">
                  {index === 0 && 'Descubre las últimas tendencias en tecnología y diseño.'}
                  {index === 1 && 'Soluciones creativas que transforman tu negocio.'}
                  {index === 2 && 'Rendimiento optimizado para una experiencia fluida.'}
                </p>
                <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  {index === 0 && 'Explorar Más'}
                  {index === 1 && 'Ver Ejemplos'}
                  {index === 2 && 'Optimizar Ahora'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Controles de Navegación */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              ref={el => dotsRef.current[index] = el}
              className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                index === 0 ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Descripción de la Animación */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">🎨 Slider Animado con GSAP</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Este slider utiliza GSAP para animar la transición entre slides con efectos de deslizamiento y fade. 
          Los puntos de navegación permiten saltar a cualquier slide, y el slider avanza automáticamente cada 4 segundos.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Técnicas usadas:</span>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-1">
              <li>gsap.to() y gsap.fromTo()</li>
              <li>gsap.context() para limpieza</li>
              <li>useRef para múltiples elementos</li>
            </ul>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Efectos:</span>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-1">
              <li>Deslizamiento horizontal</li>
              <li>Fade in/out</li>
              <li>Cambio de color en puntos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}