import React, { useState, useEffect } from 'react';

interface Settings {
  resolution: string;
  fullscreen: boolean;
  volume: number;
  audioEnabled: boolean;
  fpsLimit: number;
  showFps: boolean;
  vsync: boolean;
  filterType: string;
}

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [settings, setSettings] = useState<Settings>({
    resolution: '640x480',
    fullscreen: false,
    volume: 80,
    audioEnabled: true,
    fpsLimit: 60,
    showFps: true,
    vsync: true,
    filterType: 'linear'
  });

  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'performance'>('video');

  // Cargar configuración guardada
  useEffect(() => {
    const savedSettings = localStorage.getItem('ps2-emulator-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('ps2-emulator-settings', JSON.stringify(settings));
    onClose();
  };

  const handleReset = () => {
    const defaultSettings: Settings = {
      resolution: '640x480',
      fullscreen: false,
      volume: 80,
      audioEnabled: true,
      fpsLimit: 60,
      showFps: true,
      vsync: true,
      filterType: 'linear'
    };
    setSettings(defaultSettings);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Configuración del Emulador</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Tabs */}
          <div className="settings-tabs">
            <button 
              className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
              onClick={() => setActiveTab('video')}
            >
              🖥️ Video
            </button>
            <button 
              className={`tab-btn ${activeTab === 'audio' ? 'active' : ''}`}
              onClick={() => setActiveTab('audio')}
            >
              🔊 Audio
            </button>
            <button 
              className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
              onClick={() => setActiveTab('performance')}
            >
              ⚡ Rendimiento
            </button>
          </div>

          {/* Video Settings */}
          {activeTab === 'video' && (
            <div className="settings-section">
              <div className="setting-group">
                <h4>Pantalla</h4>
                
                <div className="setting-item">
                  <label htmlFor="resolution">Resolución:</label>
                  <select 
                    id="resolution"
                    value={settings.resolution}
                    onChange={(e) => updateSetting('resolution', e.target.value)}
                  >
                    <option value="640x480">640x480 (Original)</option>
                    <option value="1280x960">1280x960 (2x)</option>
                    <option value="1920x1440">1920x1440 (3x)</option>
                    <option value="2560x1920">2560x1920 (4x)</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.fullscreen}
                      onChange={(e) => updateSetting('fullscreen', e.target.checked)}
                    />
                    Pantalla completa
                  </label>
                </div>

                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.vsync}
                      onChange={(e) => updateSetting('vsync', e.target.checked)}
                    />
                    VSync
                  </label>
                </div>
              </div>

              <div className="setting-group">
                <h4>Filtros</h4>
                
                <div className="setting-item">
                  <label htmlFor="filter">Tipo de filtro:</label>
                  <select 
                    id="filter"
                    value={settings.filterType}
                    onChange={(e) => updateSetting('filterType', e.target.value)}
                  >
                    <option value="nearest">Nearest (Pixelado)</option>
                    <option value="linear">Linear (Suavizado)</option>
                    <option value="bilinear">Bilinear</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Audio Settings */}
          {activeTab === 'audio' && (
            <div className="settings-section">
              <div className="setting-group">
                <h4>Audio General</h4>
                
                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.audioEnabled}
                      onChange={(e) => updateSetting('audioEnabled', e.target.checked)}
                    />
                    Habilitar audio
                  </label>
                </div>

                <div className="setting-item">
                  <label htmlFor="volume">
                    Volumen: {settings.volume}%
                  </label>
                  <input
                    type="range"
                    id="volume"
                    min="0"
                    max="100"
                    value={settings.volume}
                    onChange={(e) => updateSetting('volume', parseInt(e.target.value))}
                    disabled={!settings.audioEnabled}
                  />
                </div>
              </div>

              <div className="setting-group">
                <h4>Configuración Avanzada</h4>
                
                <div className="setting-item">
                  <label htmlFor="sample-rate">Frecuencia de muestreo:</label>
                  <select id="sample-rate">
                    <option value="44100">44.1 kHz</option>
                    <option value="48000">48 kHz</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label htmlFor="buffer-size">Tamaño de buffer:</label>
                  <select id="buffer-size">
                    <option value="512">512 samples</option>
                    <option value="1024">1024 samples</option>
                    <option value="2048">2048 samples</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Performance Settings */}
          {activeTab === 'performance' && (
            <div className="settings-section">
              <div className="setting-group">
                <h4>Rendimiento</h4>
                
                <div className="setting-item">
                  <label htmlFor="fps-limit">Límite de FPS:</label>
                  <select 
                    id="fps-limit"
                    value={settings.fpsLimit}
                    onChange={(e) => updateSetting('fpsLimit', parseInt(e.target.value))}
                  >
                    <option value={60}>60 FPS</option>
                    <option value={30}>30 FPS</option>
                    <option value={120}>120 FPS</option>
                    <option value={0}>Sin límite</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={settings.showFps}
                      onChange={(e) => updateSetting('showFps', e.target.checked)}
                    />
                    Mostrar contador de FPS
                  </label>
                </div>
              </div>

              <div className="setting-group">
                <h4>Optimización</h4>
                
                <div className="setting-item">
                  <label htmlFor="thread-count">Hilos de CPU:</label>
                  <select id="thread-count">
                    <option value="1">1 hilo</option>
                    <option value="2">2 hilos</option>
                    <option value="4">4 hilos</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>
                    <input type="checkbox" />
                    Habilitar aceleración por hardware
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={handleReset}>
            Restablecer
          </button>
          <div className="footer-right">
            <button className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn-primary" onClick={handleSave}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;