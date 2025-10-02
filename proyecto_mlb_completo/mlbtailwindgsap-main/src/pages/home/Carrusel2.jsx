import b1 from '../../assets/b1.jpg';
import b2 from '../../assets/b2.jpg';
import b3 from '../../assets/b3.jpg';
import SimpleSlider from '../../components/ui/SimpleSlider';


const images = [
  {
    src: b2,
    alt: "Miguel Cabrera",
    title: "Miguel Cabrera",
    description: "3000 hits, 500 HR, MVP, Triple Corona... Un inmortal del béisbol mundial."
  },
  {
    src: b1,
    alt: "José Altuve",
    title: "José Altuve",
    description: "Pequeño de estatura, gigante de corazón. MVP, campeón del mundo y orgullo de Venezuela."
  },
    {
    src: b3,
    alt: "Ronald Acuña Jr.",
    title: "Ronald Acuña Jr.",
    description: "elocidad, poder, clase. El rostro joven del béisbol venezolano en el MLB."
  }
];

export const Carrusel2 = () => <SimpleSlider images={images} />;
