import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef();
  const overlayRef = useRef();
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // Animar entrada
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.7, duration: 0.3, ease: "power2.out" }
      );
    } else if (visible) {
      // Animar salida
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: "power2.in"
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setVisible(false)
      });
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-gray-900 rounded-lg max-w-xl w-full p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl font-bold leading-none"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>
        <div className="text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
