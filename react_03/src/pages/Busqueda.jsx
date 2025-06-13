import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CardProduc from "../components/CardProduc";

const API = 'https://dummyjson.com/products/search?q=';

const Busqueda = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation()
  const txtbuscar = location.state;

  const getDatos = async (search) => {
        try {
            const URI = API + search
            const response = await fetch(URI);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data.products);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos(txtbuscar);
    }, [txtbuscar]);
    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando Productos...</p>
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
    if (datos == 0) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>No se consigue este producto</h4>
                <p>{error}</p>
            </div>
        );
    }
  return (
    <div className="container">
      <h4 className="text-center py-4">{txtbuscar} {datos.length}</h4>
      <div className="row">
        {datos.map((item) =>(
          <CardProduc key={item.id}  item={item} />
        ))}
      </div>
      
    </div>
  )
}

export default Busqueda