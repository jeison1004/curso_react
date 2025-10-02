import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SimpleSlider({ images }) {
  const slidesRef = useRef([]);
  const currentSlide = useRef(0);

  useEffect(() => {
    // Inicializa: oculta todos excepto el primero
    gsap.set(slidesRef.current, { x: '100%', opacity: 0 });
    gsap.set(slidesRef.current[0], { x: 0, opacity: 1 });

    // Función para cambiar slide
    const goToSlide = (index) => {
      if (index === currentSlide.current) return;

      gsap.to(slidesRef.current[currentSlide.current], {
        x: '-100%',
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
      });

      gsap.fromTo(
        slidesRef.current[index],
        { x: '100%', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }
      );

      currentSlide.current = index;
    };

    // Auto-play cada 4 segundos
    const interval = setInterval(() => {
      let next = (currentSlide.current + 1) % images.length;
      goToSlide(next);
    }, 4000);

    // Limpieza al desmontar
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-120 overflow-hidden rounded-lg shadow-lg">
      {images.map((img, i) => (
        <div
          key={i}
          ref={el => slidesRef.current[i] = el}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-black bg-opacity-50 text-white p-4 rounded">
            <h2 className="text-xl font-bold">{img.title}</h2>
            <p>{img.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
