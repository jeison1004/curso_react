// src/components/CardJugadores.jsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Modal from './Modal';

const CardJugadores = ({ item, l1, v1, l2, v2, l3, v3 }) => {
  const cardRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada del card
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      ref={cardRef}
      className="bg-gray-900 border border-white/20 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
    >
      {/* Imagen */}
      <img
        src={`https://api.arsistemamlb.com/uploads/jugadores/${item.id}.jpg`}
        alt={item.nombre}
        className="w-full h-64 object-cover"
      />

      {/* Contenido */}
      <div className="p-4 flex flex-col justify-between h-64">
        {/* Nombre y lugar de nacimiento */}
        <div>
          <h3 className="text-lg font-bold text-white text-center mb-1">{item.nombre}</h3>
          <p className="text-sm text-gray-400 text-center mb-4">{item.lugar_nacimiento}</p>
        </div>

        {/* Estadísticas */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">{l1}:</span>
            <span className="font-semibold text-yellow-400">{v1}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">{l2}:</span>
            <span className="font-semibold text-green-400">{v2}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">{l3}:</span>
            <span className="font-semibold text-blue-400">{v3}</span>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            Perfil
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
            onClick={openModal}
          >
            Detalle
          </button>
        </div>
      </div>

      {/* Modal */}
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Detalle del Jugador">
        <div className="flex gap-4">
          <img
            src={`https://api.arsistemamlb.com/uploads/jugadores/${item.id}.jpg`}
            alt={item.nombre}
            className="w-32 h-48 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{item.nombre} ({item.posicion})</h3>
            <p className="text-sm text-gray-400 mb-2">
              Debut: {item.debut} / Retiro: {item.retiro} / Años en MLB: {item.anios_mlb}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              Partidos jugados: {item.partidos_jugados} / Turnos al bate: {item.turnos_al_bate} / Veces al bate: {item.veces_al_bate}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              Hits: {item.hits} / Dobles: {item.dobles} / Triples: {item.triples} / Jonrones: {item.jonrones}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              Carreras Anotadas: {item.carreras_anotadas} / Carreras Impulsadas: {item.carreras_impulsadas}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              Bases por bola: {item.bases_por_bola} / Bases Robadas: {item.bases_robadas} / Atrapado Robando: {item.atrapado_robando} / Ponches: {item.ponches}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              Promedio bateo: {item.promedio_bateo} / Porcentaje Embase: {item.porcentaje_embase} / Slugging: {item.slugging}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              OPS: {item.ops} / WAR: {item.war}
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 bg-red-500 text-white text-xs rounded">
                ★ All-Star: {item.all_star}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              <strong>Fecha de Nacimiento:</strong> {item.fecha_nacimiento} / 
              <strong>Lugar de Nacimiento:</strong> {item.lugar_nacimiento}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {item.biografia}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CardJugadores;