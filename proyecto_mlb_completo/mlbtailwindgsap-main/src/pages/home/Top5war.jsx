import { useEffect, useState } from "react";
const API = 'http://localhost:8080/api/estadisticas/top-avg';

const Top5war = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getDatos = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatos(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getDatos();
  }, []);
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Cargando Personajes...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al cargar los Personajes</h4>
        <p>{error}</p>
      </div>
    );
  }
  return (
          <section  className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 text-yellow-400 mr-3">🏆</div>
              <h2 className="text-3xl font-bold">Top 5 en WAR</h2>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold">#</th>
                  <th className="px-6 py-4 text-sm font-semibold">Jugador</th>
                  <th className="px-6 py-4 text-sm font-semibold">Lugar de Nacimiento</th>
                  <th className="px-6 py-4 text-sm font-semibold">WAR</th>
                </tr>
              </thead>
              <tbody>
                {datos.slice(0, 5).map((item,index) => (
                    <tr className="border-t border-gray-700">
                    <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-400 text-black font-bold rounded-full">1</span>
                    </td>
                    <td className="px-6 py-4 font-semibold">{item.nombre}</td>
                    <td className="px-6 py-4">{item.lugar_nacimiento}</td>
                    <td className="px-6 py-4">{item.promedio_bateo*1000}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <button className="bg-transparent border border-green-400 text-green-400 px-6 py-3 rounded-lg hover:bg-green-400 hover:text-black transition-colors">
              Ver todos los rankings
            </button>
          </div>
        </div>
      </section> 
  )
}

export default Top5war