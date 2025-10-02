// src/pages/animations/ScrollTriggerAnimation.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registra el plugin
gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerAnimation() {
  const sectionRef = useRef();
  const boxesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación 1: Fade in de la sección al hacer scroll
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Cuando el top del trigger llega al 80% del viewport
          end: "top 60%",
          toggleActions: "play none none reverse"
        }
      });

      // Animación 2: Stagger de las cajas
      gsap.from(boxesRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      });

      // Animación 3: Escala del título
      const title = sectionRef.current.querySelector('h2');
      if (title) {
        gsap.from(title, {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: title,
            start: "top 90%",
            end: "top 70%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Espacio para hacer scroll */}
      <div className="h-96"></div>

      {/* Sección con ScrollTrigger */}
      <div ref={sectionRef} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          🎯 ScrollTrigger con GSAP
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-3xl mx-auto">
          Haz scroll para ver cómo las animaciones se activan cuando los elementos entran en el viewport.
          ScrollTrigger sincroniza perfectamente las animaciones con el scroll del usuario.
        </p>

        {/* Contenedor de Cajas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            ref={el => boxesRef.current[0] = el}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300"
          >
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              📊
            </div>
            <h3 className="text-xl font-bold mb-2">Métricas en Tiempo Real</h3>
            <p className="text-blue-100">
              Datos actualizados al instante mientras haces scroll.
            </p>
          </div>
          <div
            ref={el => boxesRef.current[1] = el}
            className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300"
          >
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              🚀
            </div>
            <h3 className="text-xl font-bold mb-2">Rendimiento Optimizado</h3>
            <p className="text-green-100">
              Animaciones fluidas que no afectan el rendimiento.
            </p>
          </div>
          <div
            ref={el => boxesRef.current[2] = el}
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300"
          >
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              🎨
            </div>
            <h3 className="text-xl font-bold mb-2">Diseño Atractivo</h3>
            <p className="text-purple-100">
              Experiencia visual impactante que mejora la retención.
            </p>
          </div>
        </div>
      </div>

      {/* Segunda Sección con ScrollTrigger */}
      <div ref={sectionRef} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          🔄 ScrollTrigger Avanzado
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Pin:</strong> Fija elementos mientras haces scroll.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <strong>Scrub:</strong> Sincroniza la animación con la posición del scroll.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Markers:</strong> Útiles para depuración (solo en desarrollo).
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
            <div className="h-32 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
              ¡Haz scroll para ver más!
            </div>
          </div>
        </div>
      </div>

      {/* Descripción de la Animación */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">🎯 ScrollTrigger con GSAP</h3>
        <p className="text-gray-600 dark:text-gray-300">
          ScrollTrigger sincroniza animaciones con el scroll del usuario, creando experiencias interactivas y fluidas.
          Ideal para secciones largas, storytelling, o dashboards con múltiples métricas.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Propiedades clave:</span>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-1">
              <li><code>trigger</code>: Elemento que activa la animación.</li>
              <li><code>start</code>: Cuándo empieza la animación.</li>
              <li><code>end</code>: Cuándo termina la animación.</li>
              <li><code>scrub</code>: Sincroniza con el scroll.</li>
            </ul>
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Usos profesionales:</span>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-1">
              <li>Revelar secciones al hacer scroll.</li>
              <li>Fijar headers o menús.</li>
              <li>Animar gráficos y estadísticas.</li>
              <li>Crear efectos de parallax.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Espacio para hacer scroll */}
      <div className="h-96"></div>
    </div>
  );
}