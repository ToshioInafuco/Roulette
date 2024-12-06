import React from 'react';
import './NumberModal.css';

const NumberModal = ({ meaning, onClose }) => {
  console.log('meaning', meaning);
  if (meaning === null) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h1> {meaning}</h1>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default NumberModal;
