import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Slider({ images }) {
  const sliderRef = useRef();
  const slidesRef = useRef([]);
  const dotsRef = useRef([]);
  const currentSlide = useRef(0);

  // Definir goToSlide aquí, accesible en todo componente
  const goToSlide = (index) => {
    if (index === currentSlide.current) return;

    dotsRef.current.forEach((dot, i) => {
      dot.classList.toggle('bg-yellow-400', i === index);
      dot.classList.toggle('bg-gray-600', i !== index);
    });

    gsap.to(slidesRef.current[currentSlide.current], {
      x: '-100%',
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
    });

    gsap.fromTo(
      slidesRef.current[index],
      { x: '100%', opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    currentSlide.current = index;
  };

  useEffect(() => {
    // Inicialización: mostrar primer slide
    gsap.set(slidesRef.current, { x: '100%', opacity: 0 });
    gsap.set(slidesRef.current[0], { x: 0, opacity: 1 });

    // Intervalo para auto cambiar slides
    const interval = setInterval(() => {
      const nextIndex = (currentSlide.current + 1) % images.length;
      goToSlide(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
 <div className="relative h-96 md:h-[500px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          ref={(el) => (slidesRef.current[index] = el)}
          className={`absolute inset-0 slider__slide slider__slide--${index + 1} `}
          style={{
            backgroundImage: `url(${image.src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: images.length - index, // para evitar superposición errónea
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="text-center p-8 max-w-2xl mx-auto text-white">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 text-yellow-400 mr-3">{image.icon}</div>
                <h1 className="text-4xl md:text-6xl font-bold">{image.title}</h1>
              </div>
              <p className="text-lg md:text-xl mb-6">{image.description}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-transparent border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition-colors">
                  {image.button1}
                </button>
                <button className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600 transition-colors">
                  {image.button2}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
