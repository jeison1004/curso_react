// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">MLB Venezuela</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">Inicio</Link>
            <Link to="/jugadores" className="text-gray-700 hover:text-primary-600 transition-colors">Jugadores</Link>
            <Link to="/estadisticas" className="text-gray-700 hover:text-primary-600 transition-colors">Estadísticas</Link>
            <Link to="/comparador" className="text-gray-700 hover:text-primary-600 transition-colors">Comparador</Link>
            <Link to="/mapa" className="text-gray-700 hover:text-primary-600 transition-colors">Mapa</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}