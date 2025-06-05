import React, { useState } from 'react';
import './App.css';

const Emulator = () => {
  const [showMessage, setShowMessage] = useState(true);

  return (
    <div className="ps2-emulator">
      <header className="header">
        <div className="logo">
          <h1>PS2 Emulator</h1>
        </div>
        <nav className="nav">
          <button className="nav-btn">Cargar Juego</button>
          <button className="nav-btn">Configuración</button>
          <button className="nav-btn">Acerca de</button>
        </nav>
      </header>

      <main className="main-container">
        <div className="screen-container">
          <canvas id="ps2-screen" width="640" height="480" />
          {showMessage && (
            <div className="no-game-message">
              <div className="ps2-icon">🎮</div>
              <h2>PS2 Emulator Web</h2>
              <p>¡Tu propia interfaz personalizada!</p>
              <button 
                className="load-game-btn"
                onClick={() => setShowMessage(false)}
              >
                Cargar Juego
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Emulator;