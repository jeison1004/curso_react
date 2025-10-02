import  { useEffect, useState } from 'react'
import CardJugadores from '../components/ui/CardJugadores';

//import CardJugadores from '../components/CardJugadores';

const API = 'http://localhost:8080/api/jugadores';

const Jugadores = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filteredJugadores, setFilteredJugadores] = useState([]);
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

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
  useEffect(() => {
    let filtered = datos;

    // Búsqueda por nombre
    if (search) {
      const normalizedSearch = search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      filtered = filtered.filter(j => {
        const normalizedNombre = j.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return normalizedNombre.includes(normalizedSearch);
      });
      filtered.sort((a, b) => (b.war || 0) - (a.war || 0));
    }

    // Filtro por posición
    if (positionFilter) {
      filtered = filtered.filter(j =>
        j.pos && j.pos.includes(positionFilter)
      );
      filtered.sort((a, b) => (b.war || 0) - (a.war || 0));
    }

    setFilteredJugadores(filtered);
  }, [datos, search, positionFilter]);

  const posiciones = [
    { value: 'SP', label: 'Lanzador (SP) Pitcher' },
    { value: 'RP', label: 'Relevista (RP) Pitcher' },
    { value: 'C', label: 'Receptor (C) Catcher' },
    { value: '1B', label: 'Primera Base (1B)' },
    { value: '2B', label: 'Segunda Base (2B)' },
    { value: '3B', label: 'Tercera Base (3B)' },
    { value: 'SS', label: 'Campo Corto (SS)' },
    { value: 'LF', label: 'Jardinero Izquierdo (LF)' },
    { value: 'CF', label: 'Jardinero Central (CF)' },
    { value: 'RF', label: 'Jardinero Derecho (RF)' },
    { value: 'DH', label: 'Bateador Designado (DH)' },
    { value: 'UTIL', label: 'Utilitid (UTIL)' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 min-h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        <p className="mt-4 text-gray-400">Cargando Jugadores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 min-h-screen bg-gray-900 text-red-400">
        <h4 className="text-xl font-bold">Error al cargar los Jugadores</h4>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-6 h-6 text-yellow-400 mr-3">📋</div>
            <h2 className="text-3xl font-bold text-white">Destacados Nacionales</h2>
          </div>
           <p className="text-gray-400">498 jugadores que han representado a la Vinotinto</p>
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option>Seleccione una posición</option>
            {posiciones.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearch('');
              setPositionFilter('');
            }}
            className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            Limpiar
          </button>

           {filteredJugadores.length === 0 ? (
          <div className="bg-yellow-900 text-yellow-200 p-4 rounded-lg text-center">
            No se encontraron jugadores con esos filtros.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredJugadores.map((item) => (
              <CardJugadores
                key={item.id}
                item={item}
                l1={'WAR'}
                v1={item.war}
                l2={'HR'}
                v2={item.home_runs}
                l3={'AVG'}
                v3={item.promedio_bateo}
              />
            ))}
          </div>
        )}
        </div>
      </div>
    </section>
  )
}

export default Jugadores