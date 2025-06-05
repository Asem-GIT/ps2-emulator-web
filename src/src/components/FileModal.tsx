import React, { useRef, useState } from 'react';

interface FileModalProps {
  onClose: () => void;
  onFileLoad: (file: File) => void;
}

const FileModal: React.FC<FileModalProps> = ({ onClose, onFileLoad }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && isValidFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      setSelectedFile(file);
    }
  };

  const isValidFile = (file: File): boolean => {
    const validExtensions = ['.iso', '.bin', '.img'];
    return validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  };

  const handleLoadFile = () => {
    if (selectedFile) {
      onFileLoad(selectedFile);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Cargar Juego de PS2</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          {!selectedFile ? (
            <div 
              className={`file-drop-zone ${isDragOver ? 'drag-over' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="drop-icon">📁</div>
              <p>Arrastra tu archivo ISO aquí</p>
              <p>o</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".iso,.bin,.img"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <button 
                className="btn-primary"
                onClick={() => fileInputRef.current?.click()}
              >
                Seleccionar Archivo
              </button>
              <small>Formatos soportados: ISO, BIN, IMG</small>
            </div>
          ) : (
            <div className="file-info">
              <div className="file-details">
                <div className="file-icon">💿</div>
                <div className="file-data">
                  <h4>{selectedFile.name}</h4>
                  <p>Tamaño: {formatFileSize(selectedFile.size)}</p>
                  <p>Tipo: {selectedFile.type || 'Imagen de disco'}</p>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn-secondary" 
                  onClick={() => setSelectedFile(null)}
                >
                  Cambiar Archivo
                </button>
                <button 
                  className="btn-success" 
                  onClick={handleLoadFile}
                >
                  Cargar Juego
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileModal;