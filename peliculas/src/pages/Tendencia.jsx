import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardPeliculas from "../components/CardPeliculas";
const API  ='https://api.themoviedb.org/3/trending/movie/day?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE'; 


const Tendencia = () => {
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
            setDatos(data.results);
            console.log(data);
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
    <div className="container">
        <h3 className="text-center">Tendencias</h3>
        <div className="row">
        {datos.map((item) => 
                ( 
                <CardPeliculas key={item.id} item={item}/>
                )
            )}
        </div>
        
    
    </div>
    
  )
}

export default Tendencia