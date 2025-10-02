import { useFadeIn } from '../../hooks/useFadeIn';
import Slider from '../../components/ui/Slider';
import b1 from '../../assets/b1.jpg';
import b2 from '../../assets/b2.jpg';
export const Carrusel = () => {
    const fadeRef = useFadeIn(0.8);
    const images = [
    {
      src: "https://arsistemamlb.com/assets/b2-CFjNaO46.jpg",
      alt: "Miguel Cabrera",
      icon: "👑",
      title: "Miguel Cabrera",
      description: "3000 hits, 500 HR, MVP, Triple Corona... Un inmortal del béisbol mundial.",
      button1: "Ver todos los peloteros",
      button2: "Top 10 WAR"
    },
    {
      src: "https://arsistemamlb.com/assets/b1-N71xHo6S.jpg",
      alt: "José Altuve",
      icon: "⚡",
      title: "José Altuve",
      description: "Pequeño de estatura, gigante de corazón. MVP, campeón del mundo y orgullo de Venezuela.",
      button1: "Conoce a más leyendas",
      button2: "Top WAR Venezolanos"
    }
  ];
  return (
    <div ref={fadeRef} className="min-h-screen bg-gray-900 text-white">
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <Slider images={images} />
      </section>
      <img src="https://arsistemamlb.com/assets/b1-N71xHo6S.jpg" alt="" />
    </div>
  )
}
