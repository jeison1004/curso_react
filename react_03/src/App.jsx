import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Inicio from "./pages/Inicio"
import Movil from "./pages/Movil"
import Laptop from "./pages/Laptop"
import Tienda from "./pages/Tienda"
import Detalle from "./pages/Detalle"
import Error404 from "./pages/Error404"
import Categorias from "./pages/Categorias"
import Busqueda from "./pages/Busqueda"
import TopHeader from "./components/TopHeader"
import DolarProvider from "./context/DolarProvider"
import CarritoProvider from "./context/CarritoProvider"


const App = () => {
  return (
    <DolarProvider> 
      <CarritoProvider> 
    <BrowserRouter>
    <div className="app">
      <Header/>
      <TopHeader/>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/movil" element={<Movil />}/>
        <Route path="/laptop" element={<Laptop />}/>
        <Route path="/tienda" element={<Tienda />}/>
        <Route path="/busqueda" element={<Busqueda/>}/>
        <Route path="/categorias/:slug/:name" element={<Categorias/>}/>
        <Route path="/detalle/:id/:titulo" element={<Detalle />}/>
        <Route path="*" element={<Error404 />}/>
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
    </CarritoProvider>
    </DolarProvider>
  )
}

export default App
