import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Tendencia from "./pages/Tendencia"
import Footer from "./components/Footer"

const App = () => {
  return (
    <BrowserRouter>
    <div className="app">
        <Header/>
        <Routes>
          <Route path="/tendencia" element={<Tendencia/>} />
          <Route path="/" element={<Tendencia/>} />
        </Routes>
        <Footer/>
    </div>
    </BrowserRouter>
  )
}

export default App