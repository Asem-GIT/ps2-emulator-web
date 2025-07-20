import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [currentGame, setCurrentGame] = useState<File | null>(null);
  const [showEmulator, setShowEmulator] = useState(false);
  const [emulatorUrl, setEmulatorUrl] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // URLs de emuladores web disponibles
  const emulatorOptions = {
    playjs: 'https://playjs.purei.org/',
    webrcade: 'https://play.webrcade.com/',
    // Puedes agregar más emuladores aquí
  };

  const handleLoadGame = () => {
    setShowFileModal(true);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar que sea un archivo ISO válido
      const validExtensions = ['.iso', '.bin', '.img', '.cue'];
      const isValidFile = validExtensions.some(ext => 
        file.name.toLowerCase().endsWith(ext)
      );
      
      if (isValidFile) {
        setCurrentGame(file);
        setIsGameLoaded(true);
        setShowFileModal(false);
        
        console.log('Archivo cargado exitosamente:', {
          name: file.name,
          size: file.size,
          type: file.type
        });
      } else {
        alert('Por favor selecciona un archivo ISO, BIN, IMG o CUE válido.');
      }
    }
  };
      

  const handlePlay = () => {
    if (isGameLoaded && currentGame) {
      setIsPlaying(true);
      setShowEmulator(true);
      setEmulatorUrl(emulatorOptions.playjs);
      
      console.log('Iniciando juego:', currentGame.name);
      console.log('URL del emulador:', emulatorOptions.playjs);
      
      // Nota: Los emuladores web como Play.js requieren que subas el archivo
      // desde su interfaz. Este es un emulador externo, no integrado.
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setShowEmulator(false);
  };

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };
  // ... (otras funciones como handlePlay, handleStop, etc.)

// Asegúrate de que este console.log esté aquí, ANTES del return:
console.log('%c --- RENDERIZANDO App --- ', 'background: lightblue; color: black;');

console.log({ 
  isGameLoaded, 
  isPlaying, 
  showFileModal, 
  currentGame: currentGame ? currentGame.name : null, 
  showEmulator, 
  emulatorUrl 
});

  return (
    <div className="ps2-emulator">
      <header className="header">
        <div className="logo">
          <h1>PS2 Emulator</h1>
        </div>
        <nav className="nav">
          <button className="nav-btn" onClick={handleLoadGame}>
            Cargar Juego
          </button>
          <button className="nav-btn">Configuración</button>
          <button className="nav-btn">Acerca de</button>
        </nav>
      </header>

      <main className="main-container">
        <div className="screen-container">
          {showEmulator && isPlaying ? (
            <div className="emulator-wrapper">
              <iframe
                ref={iframeRef}
                src={emulatorUrl}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="PS2 Emulator"
                allow="gamepad; fullscreen"
              />
              <div className="emulator-overlay">
                <button className="overlay-btn" onClick={handleFullscreen}>
                  🔍 Pantalla Completa
                </button>
                <button className="overlay-btn" onClick={handleStop}>
                  ❌ Cerrar
                </button>
              </div>
            </div>
          ) : (
            <>
              <canvas id="ps2-screen" width="640" height="480" />
              <div className="no-game-message">
                <div className="ps2-icon">🎮</div>
                <h2>PS2 Emulator Web</h2>
                {!isGameLoaded ? (
                  <>
                    <p>Selecciona un archivo ISO para comenzar</p>
                    <button className="load-game-btn" onClick={handleLoadGame}>
                      Cargar Juego
                    </button>
                  </>
                ) : (
                  <>
                    <p>Juego listo: {currentGame?.name}</p>
                    <p>Tamaño: {currentGame ? (currentGame.size / (1024 * 1024)).toFixed(2) : '0'} MB</p>
                    <button className="load-game-btn" onClick={handlePlay}>
                      ▶️ Iniciar Juego
                    </button>
                    <button 
                      className="load-game-btn secondary" 
                      onClick={() => setIsGameLoaded(false)}
                      style={{ marginTop: '0.5rem', opacity: 0.7 }}
                    >
                      🔄 Cambiar Juego
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Controles del emulador */}
        <div className="controls-panel">
          <div className="emulator-controls">
            <button 
              className="control-btn"
              onClick={handlePlay}
              disabled={!isGameLoaded}
            >
              {isPlaying ? '⏸️ Pausar' : '▶️ Iniciar'}
            </button>
            <button 
              className="control-btn"
              onClick={handleStop}
              disabled={!isGameLoaded || !isPlaying}
            >
              ⏹️ Detener
            </button>
            <button 
              className="control-btn"
              onClick={handleFullscreen}
              disabled={!isPlaying}
            >
              🔍 Pantalla Completa
            </button>
          </div>

          <div className="performance-info">
            <div className="info-item">
              <span className="label">Estado:</span>
              <span className={`value ${isPlaying ? 'running' : ''}`}>
                {isPlaying ? 'Ejecutando' : 'Detenido'}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Emulador:</span>
              <span className="value">Play!.js</span>
            </div>
            {currentGame && (
              <div className="info-item">
                <span className="label">Archivo:</span>
                <span className="value">{currentGame.name.substring(0, 15)}...</span>
              </div>
            )}
          </div>
        </div>

        {/* Instrucciones */}
        {!isGameLoaded && (
          <div className="instructions">
            <h3>Instrucciones:</h3>
            <ul>
              <li>1. Consigue un archivo ISO de PS2 (legal)</li>
              <li>2. Haz clic en "Cargar Juego"</li>
              <li>3. Selecciona tu archivo ISO</li>
              <li>4. Haz clic en "Iniciar Juego"</li>
              <li>5. En el emulador web, sube tu archivo ISO</li>
              <li>6. ¡Disfruta!</li>
            </ul>
            <div className="note">
              <strong>Nota:</strong> Este emulador abre Play.js en una nueva ventana. 
              Necesitarás subir tu archivo ISO desde la interfaz del emulador web.
            </div>
          </div>
        )}
      </main>

      {showFileModal && (
  <div className="modal-overlay" onClick={() => setShowFileModal(false)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3>Cargar Juego de PS2</h3>
        <button className="close-btn" onClick={() => setShowFileModal(false)}>
          X
        </button>
      </div>
      <div className="modal-body">
        <div className="file-upload-zone">
          <div className="drop-icon">📁</div>
          <p 
            style={{ cursor: 'pointer' }}  // Añade esto para mostrar que es clickeable
            onClick={() => fileInputRef.current?.click()}  // Añade este onClick
          >
            Selecciona tu archivo ISO de PS2
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '1rem' }}>
            Solo archivos que poseas legalmente
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".iso,.bin,.img,.cue"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  </div>
)}
</div>
);
};

export default App;