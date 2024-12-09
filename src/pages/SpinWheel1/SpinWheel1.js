import React from 'react';
import '../SpinWheel1/style.css';
import { useNavigate } from 'react-router-dom';
import Wheel from '../../components/wheel';


const MEANINGS = (process.env.REACT_APP_WHEEL_VALUES || '')
  .split(',')
  .map(item => item.split(':')[1]?.trim()) // Pega o valor após os `:`
  .filter(Boolean); // Remove itens inválidos ou nulos

const SpinWheel1 = () => {
  const navigate = useNavigate();

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
      <Wheel values={MEANINGS} />
    </div>
  );
};

export default SpinWheel1;
