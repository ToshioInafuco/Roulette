import React from 'react';
import '../SpinWheel1/style.css';
import { useNavigate } from 'react-router-dom';
import Wheel from '../../components/wheel';

const bla = process.env.REACT_APP_LOCAL;

const SpinWheel1 = () => {
  const navigate = useNavigate();

  // Converta MEANINGS em um array de valores para passar ao componente Wheel

  return (
    <div
      style={{
        // Alinhamento centralizado, caso necessário
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button onClick={() => navigate('/')} style={{ marginBottom: '50px' }}>
        Voltar para a Página Inicial
      </button>
      <Wheel values={bla} />
    </div>
  );
};

export default SpinWheel1;
