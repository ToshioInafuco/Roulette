import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SpinWheel1 from './pages/SpinWheel1/SpinWheel1';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spinwheel1" element={<SpinWheel1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
