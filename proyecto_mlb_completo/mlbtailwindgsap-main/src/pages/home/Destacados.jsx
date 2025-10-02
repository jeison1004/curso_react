import { useEffect, useState } from "react";
const API = 'http://localhost:8080/api/estadisticas/destacados';


const Destacados = () => {
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
            console.log(data)
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
                <p>Cargando jugadores...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los jugadores</h4>
                <p>{error}</p>
            </div>
        );
    }
    return (
        <section className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-8 h-8 text-yellow-400 mr-3">☀️</div>
                        <h2 className="text-3xl font-bold">Destacados Nacionales</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="bg-gray-700 p-6 rounded-lg text-center">
                        <img 
                            src={`http://localhost:8080/uploads/jugadores/${datos.war_mas_alto.id}.jpg`} 
                            alt={datos.war_mas_alto.jugador} 
                            className="w-24 h-34 mx-auto mb-4 rounded" 
                            onError={(e) => {
                                e.target.src = 'http://localhost:8080/uploads/jugadores/default.png';
                            }}
                        />
                        <div className="text-yellow-400 text-3xl font-bold mb-2">{datos.war_mas_alto.valor}</div>
                        <div className="text-sm text-gray-300 mb-2">WAR más alto</div>
                        <div className="text-sm text-gray-400 mb-4">{datos.war_mas_alto.jugador}</div>
                        <div className="text-xs text-gray-500 bg-gray-600 px-3 py-1 rounded">{datos.war_mas_alto.ciudad}</div>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg text-center">
                        <img 
                            src={`http://localhost:8080/uploads/jugadores/${datos.mejor_avg.id}.jpg`} 
                            alt={datos.mejor_avg.jugador} 
                            className="w-24 h-34 mx-auto mb-4 rounded" 
                            onError={(e) => {
                                e.target.src = 'http://localhost:8080/uploads/jugadores/default.png';
                            }}
                        />
                        <div className="text-yellow-400 text-3xl font-bold mb-2">{datos.mejor_avg.valor}</div>
                        <div className="text-sm text-gray-300 mb-2">Mejor AVG</div>
                        <div className="text-sm text-gray-400 mb-4">{datos.mejor_avg.jugador}</div>
                        <div className="text-xs text-gray-500 bg-gray-600 px-3 py-1 rounded">{datos.mejor_avg.ciudad}</div>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg text-center">
                        <img 
                            src={`http://localhost:8080/uploads/jugadores/${datos.mas_all_star.id}.jpg`} 
                            alt={datos.mas_all_star.jugador}
                            className="w-24 h-34 mx-auto mb-4 rounded" 
                            onError={(e) => {
                                e.target.src = 'http://localhost:8080/uploads/jugadores/default.png';
                            }}
                        />
                        <div className="text-yellow-400 text-3xl font-bold mb-2">{datos.mas_all_star.valor}</div>
                        <div className="text-sm text-gray-300 mb-2">All-Star apariciones</div>
                        <div className="text-sm text-gray-400 mb-4">{datos.mas_all_star.jugador}</div>
                        <div className="text-xs text-gray-500 bg-gray-600 px-3 py-1 rounded">{datos.mas_all_star.ciudad}</div>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg text-center">
                        <img 
                            src={`http://localhost:8080/uploads/jugadores/${datos.lider_ops.id}.jpg`} 
                            alt={datos.lider_ops.jugador} 
                            className="w-24 h-34 mx-auto mb-4 rounded" 
                            onError={(e) => {
                                e.target.src = 'http://localhost:8080/uploads/jugadores/default.png';
                            }}    
                        />
                        <div className="text-yellow-400 text-3xl font-bold mb-2">{datos.lider_ops.valor}</div>
                        <div className="text-sm text-gray-300 mb-2">Lider en OPS</div>
                        <div className="text-sm text-gray-400 mb-4">{datos.lider_ops.jugador}</div>
                        <div className="text-xs text-gray-500 bg-gray-600 px-3 py-1 rounded">{datos.lider_ops.ciudad}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Destacados