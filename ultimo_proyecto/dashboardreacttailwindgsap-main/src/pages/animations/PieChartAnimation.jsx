import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PieChartAnimation() {
  const chartRef = useRef();
  const pathsRef = useRef([]);

  useEffect(() => {
    const data = [
      { name: 'Ventas', value: 45, color: '#3b82f6' },
      { name: 'Marketing', value: 30, color: '#10b981' },
      { name: 'Soporte', value: 25, color: '#f59e0b' }
    ];
    const total = data.reduce((acc, item) => acc + item.value, 0);
    let cumulativePercent = 0;

    data.forEach((item, index) => {
      const percent = item.value / total;
      const startAngle = cumulativePercent * 360;
      const endAngle = (cumulativePercent + percent) * 360;
      cumulativePercent += percent;

      const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
      const start = polarToCartesian(150, 150, 100, endAngle);
      const end = polarToCartesian(150, 150, 100, startAngle);

      const finalPath = [
        `M 150 150`,
        `L ${start.x} ${start.y}`,
        `A 100 100 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
        `Z`
      ].join(' ');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', item.color);
      path.setAttribute('stroke', '#fff');
      path.setAttribute('stroke-width', '2');
      chartRef.current.appendChild(path);
      pathsRef.current[index] = path;

      // Animar de un path muy pequeño al path final
      const initialPath = `M 150 150 L 150 150 Z`;

      gsap.fromTo(
        path,
        { attr: { d: initialPath } },
        { attr: { d: finalPath }, duration: 1.5, ease: 'power2.out', delay: index * 0.3 }
      );
    });

    return () => {
      pathsRef.current.forEach(path => {
        if (path && chartRef.current) chartRef.current.removeChild(path);
      });
      pathsRef.current = [];
    };
  }, []);

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <svg
      ref={chartRef}
      width="400"
      height="400"
      viewBox="0 0 300 300"
      style={{ background: '#fff', borderRadius: '8px' }}
    />
  );
}
