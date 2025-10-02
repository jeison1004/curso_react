import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BarChartAnimation() {
  const barsRef = useRef([]);
  const containerRef = useRef();

  useEffect(() => {
    const data = [
      { label: 'Muñecas', value: 30, color: '#3b82f6' },
      { label: 'Carros', value: 25, color: '#10b981' },
      { label: 'Bloques', value: 20, color: '#f59e0b' },
      { label: 'Peluches', value: 15, color: '#ef4444' },
      { label: 'Juegos de mesa', value: 10, color: '#8b5cf6' },
    ];

    data.forEach((item, index) => {
      const bar = barsRef.current[index];
      if (bar) {
        gsap.fromTo(
          bar,
          { height: 0 },
          {
            height: `${item.value * 5}px`, // escala para visualización
            duration: 1.2,
            delay: index * 0.3,
            ease: 'power2.out'
          }
        );
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">📊 Gráfico de Barras Animado</h2>
      <div className="flex items-end gap-4 justify-center h-48">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={el => barsRef.current[i] = el}
            className="w-10 rounded-t"
            style={{ backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i] }}
          ></div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-4 text-sm text-gray-700">
        <span>Muñecas</span>
        <span>Carros</span>
        <span>Bloques</span>
        <span>Peluches</span>
        <span>Juegos</span>
      </div>
    </div>
  );
}
