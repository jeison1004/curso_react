
import Footer from './components/Footer'
import Header from './components/Header'
import CarritoProvider from './contexts/CarritoProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Movil from './pages/Movil'
import Laptop from './pages/Laptop'
import Tienda from './pages/Tienda'
import Categorias from './pages/Categorias'
import Busquedas from './pages/Busquedas'
// para las animaciones
import 'animate.css';
import WOW from 'wow.js';
import { useEffect } from 'react'


const App = () => {
   // inicializar WOW.js para las animaciones
  useEffect(() => {
    const wow = new WOW({
      live: true // detecta elementos dinámicos
    });
    wow.init();
  }, []);
  return (
    <CarritoProvider>
      <div className="app">
        <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Movil/>}/>
          <Route path="/Celulares" element={<Movil/>}/>
          <Route path='/Laptops' element={<Laptop/>}/>
          <Route path='/Tienda' element={<Tienda/>}/>
          <Route path="/categorias/:id" element={<Categorias />} />
          <Route path="/busquedas" element={<Busquedas />} />
        </Routes>
        
        </BrowserRouter>
      </div>
    </CarritoProvider>
  )
}

export default App