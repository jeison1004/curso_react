// src/components/ui/AnimatedCounter.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedCounter({ value, label = "", duration = 2 }) {
  const counterRef = useRef();

  useEffect(() => {
    gsap.to(counterRef.current, {
      innerText: value,
      duration,
      ease: "power1.out",
      snap: { innerText: 1 },
      onUpdate: function() {
        let val = Math.ceil(counterRef.current.innerText);
        if (label.startsWith('$')) {
          counterRef.current.innerText = `$${val.toLocaleString()}`;
        } else {
          counterRef.current.innerText = val + (label ? ` ${label}` : '');
        }
      }
    });
  }, [value, duration, label]);

  return (
    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
      <span ref={counterRef}>0</span>
    </div>
  );
}