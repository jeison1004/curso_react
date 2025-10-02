import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PieChartToys() {
  const chartRef = useRef();
  const pathsRef = useRef([]);
  const labelsRef = useRef([]);

  useEffect(() => {
    const data = [
      { name: 'Muñecas', value: 30, color: '#3b82f6' },
      { name: 'Carros', value: 25, color: '#10b981' },
      { name: 'Bloques', value: 20, color: '#f59e0b' },
      { name: 'Peluches', value: 15, color: '#ef4444' },
      { name: 'Juegos de mesa', value: 10, color: '#8b5cf6' },
    ];
    const total = data.reduce((acc, item) => acc + item.value, 0);
    let cumulativePercent = 0;

    data.forEach((item, index) => {
      const percent = item.value / total;
      const startAngle = cumulativePercent * 360;
      const endAngle = (cumulativePercent + percent) * 360;
      cumulativePercent += percent;

      // Calcula los puntos para el path
      const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
      const start = polarToCartesian(150, 150, 100, endAngle);
      const end = polarToCartesian(150, 150, 100, startAngle);

      // Construye path final
      const finalPath = [
        `M 150 150`,
        `L ${start.x} ${start.y}`,
        `A 100 100 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
        `Z`
      ].join(' ');

      // Crear el path SVG
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', item.color);
      path.setAttribute('stroke', '#fff');
      path.setAttribute('stroke-width', '2');
      chartRef.current.appendChild(path);
      pathsRef.current[index] = path;

      // Crear la etiqueta SVG
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('fill', '#374151');
      label.setAttribute('font-size', '14');
      label.setAttribute('font-weight', 'bold');
      label.setAttribute('text-anchor', 'middle');

      // Posiciona la etiqueta en el medio del ángulo del sector
      const midAngle = (startAngle + endAngle) / 2;
      const labelPos = polarToCartesian(150, 150, 70, midAngle);
      label.setAttribute('x', labelPos.x);
      label.setAttribute('y', labelPos.y);
      label.textContent = `${item.name}: ${item.value}%`;
      chartRef.current.appendChild(label);
      labelsRef.current[index] = label;

      // Animar el path desde un punto central pequeño
      const initialPath = `M 150 150 L 150 150 Z`;
      gsap.fromTo(
        path,
        { attr: { d: initialPath } },
        { attr: { d: finalPath }, duration: 1.5, ease: 'power2.out', delay: index * 0.3 }
      );
    });

    return () => {
      // Limpieza cuando se desmonta
      pathsRef.current.forEach(path => {
        if (path && chartRef.current) chartRef.current.removeChild(path);
      });
      pathsRef.current = [];
      labelsRef.current.forEach(label => {
        if (label && chartRef.current) chartRef.current.removeChild(label);
      });
      labelsRef.current = [];
    };
  }, []);

  // Convierte coordenadas polares a cartesianas
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">📊 Distribución de Juguetes</h2>
      <svg
        ref={chartRef}
        width="400"
        height="400"
        viewBox="0 0 300 300"
        className="mx-auto"
      />
    </div>
  );
}
