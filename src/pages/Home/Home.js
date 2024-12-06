import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Escolha uma Roleta</h1>
      <button onClick={() => navigate('/spinwheel1')}>wheel 1</button>
      <button onClick={() => navigate('/spinwheel2')}>Spin Wheel 2</button>
    </div>
  );
};

export default Home;
