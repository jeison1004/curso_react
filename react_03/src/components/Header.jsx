import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import FiltroCategoria from "./FIltroCategorias"
import { useContext, useState } from "react"
import { CarritoContext } from "../context/CarritoContext"
import { TbShoppingCartSearch } from "react-icons/tb"
import VerCarrito from "./VerCarrito"


const Header = () => {
  const [txtbuscar, setTxtbuscar] = useState('')
  const { cart, agregar, eliminar, vaciar, comprar } = useContext(CarritoContext)
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

          const totalCantidad = cart.reduce((total, item) => total + item.cantidad, 0);
      const totalPrecio = cart.reduce((total, item) => total + item.cantidad * item.price, 0);

  const manejoTxt = (event) => {
    setTxtbuscar(event.target.value)
    console.log(txtbuscar)
  };
  const navigate = useNavigate();

  const manejoEnvio = (event) => {
    event.preventDefault();
    navigate('/busqueda', {
      state: txtbuscar,
    });	

  
    
  
  }
  return (
    <> 
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={'/inicio'} className="nav-link active" aria-current="page" >Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to={'/movil'} className="nav-link" href="#">Movil</Link>
              </li>
              <li className="nav-item">
                <Link to={'/laptop'} className="nav-link" href="#">Laptop</Link>
              </li>
              <li className="nav-item">
                <Link to={'/tienda'} className="nav-link" href="#">Tienda</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categorias
                </a>
                <ul className="dropdown-menu">
                  <FiltroCategoria/>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            {cart.length > 0 && (
                                  <button className="btn btn-outline-warning me-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
                                      <TbShoppingCartSearch className="fs-3" />
                                      <span className="badge bg-danger m-1">{cart.length}</span>
                                  </button>
                              )}
            <form className="d-flex" role="search" onSubmit={manejoEnvio}>
              <input value={txtbuscar} onChange={manejoTxt} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <VerCarrito cart={cart} agregar={agregar} eliminar={eliminar} vaciar={vaciar} comprar={comprar}/>
    </>
  )
}

export default Header