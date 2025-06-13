import { useEffect, useState } from "react";

const API = 'https://dragonball-api.com/api/characters?page=1&limit=100'

const Personajes = () => {
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
            console.log(data)
            setDatos(data.items);
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
        <h4 className="text-center py-4">{datos.length} Personajes </h4>
        <div className="row">
            {datos.map((item) => (
                <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                     <div className="card h-100">
                            <div className="card-header p-0">
                                <img
                                    src={item.image}
                                    className="card-img-top"
                                    alt={item.name}
                                    style={{
                                        height: "300px",
                                        objectFit: "cover",
                                        width: "100%",
                                        objectPosition: "top",
                                    }}
                                 />
                        </div>
                        <div className="card-body text-center">
                            <p className="card-title fw-bold fs-4">{item.name}</p>
                            <p><b>Raza:</b> {item.race}<br />
                            <b>Energía:</b> <span className="badge text-bg-danger">{item.ki}</span></p>
                        </div>
                        <div className="card-footer text-center">
                            <a href="#" className="btn btn-outline-info btn-sm me-3" data-bs-toggle="modal" data-bs-target={`#${item.id}`}>
                                    Modal
                            </a>
                            <a href="#" className="btn btn-outline-danger btn-sm">
                                    Detalle
                            </a>
                        </div>
                    </div>

                                <div>
               
                
                {/* Modal */}
                <div className="modal fade" id={item.id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{item.name}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-4 ">
                                            <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: "100%",
                                            
                                        }}
                                 />
                                        </div>
                                        <div className="col-md-8">
                                            <h3>{item.name}</h3>
                                            <p><b>Raza:</b> {item.race}<br />
                                            <b>Energía:</b> <span className="badge text-bg-danger">{item.ki}</span> <br />
                                            <b>Energia Maxima:</b> {item.maxKi} <br /> <br />
                                            {item.description}</p>
                                        </div>
                                    </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                </div>
            ))
            }
        </div>
    </div>
  )
}

export default Personajes