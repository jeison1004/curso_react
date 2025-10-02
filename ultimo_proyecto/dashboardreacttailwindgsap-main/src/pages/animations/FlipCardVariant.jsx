import { useRef } from 'react';
import gsap from 'gsap';

export default function FlipCardVariant() {
  const cardRef = useRef();

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      duration: 0.8,
      rotationY: 180,
      ease: 'power2.inOut',
      scale: 1.05,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      duration: 0.8,
      rotationY: 0,
      ease: 'power2.inOut',
      scale: 1,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        width: '300px', 
        height: '200px', 
        perspective: '1200px', 
        cursor: 'pointer',
        transformStyle: 'preserve-3d'
      }}
      className="relative rounded-lg"
    >
      {/* Front side */}
      <div
        style={{
          backfaceVisibility: 'hidden',
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          userSelect: 'none',
        }}
      >
        Vista Frontal
      </div>

      {/* Back side */}
      <div
        style={{
          backfaceVisibility: 'hidden',
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: '#1f2937',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          transform: 'rotateY(180deg)',
          userSelect: 'none',
        }}
      >
        Vista Trasera
      </div>
    </div>
  );
}