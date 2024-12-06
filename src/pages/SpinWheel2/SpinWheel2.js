import React, { useState } from 'react';
import '../SpinWheel2/style.css';
import NumberModal from '../../components/NumberModal';
import { useNavigate } from 'react-router-dom';

const SECTORS = [1, 2, 3, 4, 5, 6, 7, 8];
const SECTOR_ANGLE = 360 / SECTORS.length;

// Mapeamento de significados
// Modificar significados com .env
const MEANINGS = {
  1: 'batata',
  2: 'polenta',
  3: 'pão',
  4: 'macarrão',
  5: 'arroz',
  6: 'feijão',
  7: 'bife',
  8: 'salada',
};

const SpinWheel2 = () => {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSpin = () => {
    const randomDegree = Math.floor(Math.random() * 360) + 720;
    const newRotation = rotation + randomDegree;
    setRotation(newRotation);

    setTimeout(() => {
      const normalizedRotation = newRotation % 360;
      const index = Math.floor(
        ((360 - normalizedRotation + SECTOR_ANGLE / 2) % 360) / SECTOR_ANGLE
      );
      const selectedValue = SECTORS[index];

      // Obtenha o significado associado ao valor sorteado
      const meaning = MEANINGS[selectedValue];

      setSelectedValue(selectedValue);
      setSelectedMeaning(meaning);
      setShowModal(true);
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: '50px',
        }}
      >
        Voltar para a Página Inicial
      </button>
      <div className="wheel-container">
        <button className="spin-button" onClick={handleSpin}>
          Spin
        </button>
        <div
          className="container"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <div className="one">1</div>
          <div className="two">2</div>
          <div className="three">3</div>
          <div className="four">4</div>
          <div className="five">5</div>
          <div className="six">6</div>
          <div className="seven">7</div>
          <div className="eight">8</div>
        </div>
        <span className="arrow"></span>
        {showModal && (
          <NumberModal
            value={selectedValue}
            meaning={selectedMeaning}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default SpinWheel2;
