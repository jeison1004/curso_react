// src/components/ui/BarChart.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BarChart({ data, title }) {
  const barsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      barsRef.current,
      { width: 0, opacity: 0 },
      {
        width: (i) => `${data[i].value}%`,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.2
      }
    );
  }, [data]);

  return (
    <div className="space-y-4 mt-2">
      {data.map((item, i) => (
        <div key={item.label} className="flex items-center">
          <span className="w-24 text-sm font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
          <div className="flex-1 mx-4 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              ref={el => barsRef.current[i] = el}
              className="h-3 bg-primary-600 dark:bg-primary-500 rounded-full"
              style={{ width: '0%' }}
            ></div>
          </div>
          <span className="w-12 text-sm font-bold text-gray-800 dark:text-gray-200">{item.value}%</span>
        </div>
      ))}
    </div>
  );
}