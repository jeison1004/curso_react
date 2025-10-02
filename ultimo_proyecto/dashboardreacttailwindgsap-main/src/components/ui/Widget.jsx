// src/components/ui/Widget.jsx
import { useFadeIn } from '../../hooks/useFadeIn';

export default function Widget({ title, children, delay = 0 }) {
  const fadeRef = useFadeIn(0.6, delay);

  return (
    <div
      ref={fadeRef}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
    >
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">{title}</h3>
      {children}
    </div>
  );
}