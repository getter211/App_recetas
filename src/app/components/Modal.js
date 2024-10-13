import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <button onClick={onClose} className="float-right">
          &times; {/* Icono de cierre */}
        </button>
        {children} {/* Aquí se renderizará el contenido del modal */}
      </div>
    </div>
  );
};

export default Modal;
