import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

const API = 'https://dummyjson.com/products/'

const Detalle = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const param = useParams();

  const getDatos = async () => {
            try {
                const response = await fetch(API + param.id);
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


  return (
    <div className="container">
      <h4 className="text-center py-5">Detalles del producto {param.titulo}</h4>
      <div className="row g-4">
        <div className="col-md-4" >
          <img className="img-fluid" src={datos.thumbnail} alt="" />
        </div>
        <div className="col-md-8" >
          <div className="p-4 h-100 shadow-sm">
                        <h5 className="fw-bold">{datos.title}</h5>
                        <p><strong>Precio:</strong> ${datos.price}</p>
                        <p><strong>Categoría:</strong> {datos.category}</p>
                        <p><strong>Marca:</strong> {datos.brand}</p>
                        <p><strong>Stock:</strong> {datos.stock} unidades</p>
                        <p><strong>Rating:</strong> {datos.rating}</p>
                        <p><strong>Descripción:</strong> {datos.description}</p>
                    </div>
        </div>
        
      </div>
      {/* Comentarios */}
            <div className="mt-5">
                <h5>Comentarios de Usuarios</h5>
                <div className="row row-cols-1 row-cols-md-2 g-3">
                    {datos.reviews.map((review, index) => (
                        <div className="col" key={index}>
                            <div className="card border-light shadow-sm">
                                <div className="card-body">
                                    <p className="mb-1"><strong>Comentario:</strong> {review.comment}</p>
                                    <p className="mb-1"><strong>Calificación:</strong> {review.rating}/5</p>
                                    <p className="mb-1"><strong>Fecha:</strong> {new Date(review.date).toLocaleDateString()}</p>
                                    <p className="mb-0"><strong>Usuario:</strong> {review.reviewerName}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    </div>
    
  )
}

export default Detalle