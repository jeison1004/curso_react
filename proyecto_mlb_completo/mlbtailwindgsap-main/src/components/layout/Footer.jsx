import { Link } from "react-router-dom";

// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AR Sistema</h3>
            <p className="text-gray-400">El béisbol no es solo un deporte en Venezuela... es una pasión que nace en cada barrio.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">⚾ API de Jugadores Venezolanos en el MLB</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to={'/jugadores'} href="#">Jugadores</Link></li>
              <li><Link to={'/estadisticas'} href="#">Estadisticas</Link></li>
              <li><Link to={'/comparador'} href="#">Comparador</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contacto</h4>
            <p className="text-gray-400">info@arsistema.com</p>
            <p className="text-gray-400">+57 300 123 4567</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 AR Sistema. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}