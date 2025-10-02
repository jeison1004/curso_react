// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

import Estadisticas from './pages/Estadisticas';
import Comparador from './pages/Comparador';
import Jugadores from './pages/Jugadores';
import Mapa from './pages/Mapa';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jugadores" element={<Jugadores />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/comparador" element={<Comparador />} />
          <Route path="/mapa" element={<Mapa />} />
        </Routes>
      </Layout>
    </Router>
  );
}