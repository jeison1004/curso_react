// src/pages/Home.jsx
import { useFadeIn } from '../hooks/useFadeIn';

import { Carrusel2 } from './home/Carrusel2';
import Destacados from './home/Destacados';
import Top5war from './home/Top5war';

const Home = () => {
  const fadeRef = useFadeIn(0.8);

  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <Carrusel2 />
        <Destacados/>
        <Top5war/>
    </div>
  );
}
export default Home;