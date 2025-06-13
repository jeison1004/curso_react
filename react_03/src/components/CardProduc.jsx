import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext"


import { DolarContext } from '../context/DolarContext';
import { useContext } from "react";


const CardProduc = ({item}) => {
  const { cart, agregar, eliminar} = useContext(CarritoContext)
  
  
  const getCantidad = (producto) => {
    return cart.find((item) => item.id === producto.id) ?.cantidad || 0
  }

  const totalProd = getCantidad(item)
    
  const precioTotal = parseFloat(item.price * totalProd);

  const formatCurrency = (value) => {
    const numero = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;

    if (isNaN(numero)) return '0,00';

    // Formatea solo el número con separador de miles y decimales
    const formattedNumber = new Intl.NumberFormat('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero);

    return ` ${formattedNumber}`;
};

  return (
    <div className="col-md-4 col-lg-3 mb-5">
            <div className="card h-100">
              <div className="card-header">
                {totalProd > 0 && (
                        <span
                            className="badge rounded-pill text-bg-warning fs-5 m-1" style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}>
                            {totalProd}
                        </span>
                    )}
                <img  src={item.thumbnail} alt={item.title} className="img-fluid" />
              </div>
              <div className="card-body text-center">
                <p>{item.title}</p>
                <p className="fs-3 text-danger fw-bold">Precio {item.price}$</p>
              {totalProd > 0 && (
                          <p className="mt-2 fs-6 text-warning">
                              Total: {formatCurrency(precioTotal)}
                          </p>
                      )}
              </div>
              <div className="card-footer text-center">
                <a className="btn btn-sm btn-outline-warning me-3" data-bs-toggle="modal" data-bs-target={`#${item.id}`} >Modal</a>
                <Link to={`/detalle/${item.id}/${item.title}`} className="btn  btn-sm btn-outline-danger"  >Detalle</Link>
                <hr />
                <button className="btn btn-success btn-sm" onClick={() => agregar(item)}>+ Agregar</button>
                {totalProd > 0 && (
                  <button className="btn btn-danger btn-sm mx-1" onClick={() => eliminar(item)}>- Restar</button>
                )}
              </div>
            </div>
            
            <div>
              
              {/* Modal */}
              <div className="modal fade" id={item.id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">{item.title}</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-4"> <img src={item.thumbnail} alt="Imagen laptop"/> </div>
                        <div className="col-md-8"> 
                          <h3>{item.title}</h3>
                          <p className="fs-3">Categoria: {item.category}</p>
                          <p className="fs-3 text-danger fw-bold">Precio: {item.price}</p>
                           
                          <p className="fs-6">{item.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
  )
}

export default CardProduc