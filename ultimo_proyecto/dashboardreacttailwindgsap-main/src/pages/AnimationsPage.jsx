// src/pages/AnimationsPage.jsx
import React, { useState } from 'react';
import { usePageTransition } from '../hooks/usePageTransition';
import Widget from '../components/ui/Widget';
import SliderAnimation from './animations/SliderAnimation';
import TypingAnimation from './animations/TypingAnimation'; // 👈 Importa el nuevo componente
//import PieChartAnimation from './animations/PieChartAnimation';
import FlipCardAnimation from './animations/FlipCardAnimation';
import PieChartToys from './animations/PieChartToys';
import BarChartAnimation from './animations/BarChartAnimation';
import ScrollTriggerAnimation from './animations/ScrollTriggerAnimation';

const AnimationsPage = () => {
  const pageRef = usePageTransition();
  const [activeTab, setActiveTab] = useState('slider');

  const renderContent = () => {
    switch (activeTab) {
      case 'slider':
        return <SliderAnimation />;
      case 'typing':
        return <TypingAnimation />; // 👈 Usa el componente
      case 'piechart':
        return (
        <>
          <PieChartToys />;
          <BarChartAnimation/>
        </>
        )
      case 'flipcard':
        return <FlipCardAnimation />;
      case 'scrolltrigger':
        return <ScrollTriggerAnimation />;
      default:
        return <SliderAnimation />;
    }
  };

  return (
    <div ref={pageRef} className="space-y-8 p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">🎬 Demostraciones de Animaciones con GSAP</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Explora diferentes tipos de animaciones profesionales</p>
      </div>

      {/* Tabs de Navegación */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActiveTab('slider')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'slider'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Slider
        </button>
        <button
          onClick={() => setActiveTab('typing')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'typing'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Typing Effect
        </button>
        <button
          onClick={() => setActiveTab('piechart')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'piechart'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Gráficos
        </button>
        <button
          onClick={() => setActiveTab('flipcard')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'flipcard'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Flip Card
        </button>
        <button
          onClick={() => setActiveTab('scrolltrigger')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'scrolltrigger'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          ScrollTrigger
        </button>
      </div>

      {/* Contenido de la Animación Seleccionada */}
      <Widget title={`Demostración: ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}>
        {renderContent()}
      </Widget>
    </div>
  );
};

export default AnimationsPage;