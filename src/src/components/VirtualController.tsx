import React, { useState } from 'react';

interface VirtualControllerProps {
  onButtonPress: (button: string, pressed: boolean) => void;
}

const VirtualController: React.FC<VirtualControllerProps> = ({ onButtonPress }) => {
  const [pressedButtons, setPressedButtons] = useState<Set<string>>(new Set());

  const handleMouseDown = (button: string) => {
    if (!pressedButtons.has(button)) {
      setPressedButtons(prev => new Set(prev).add(button));
      onButtonPress(button, true);
    }
  };

  const handleMouseUp = (button: string) => {
    if (pressedButtons.has(button)) {
      setPressedButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(button);
        return newSet;
      });
      onButtonPress(button, false);
    }
  };

  const isPressed = (button: string) => pressedButtons.has(button);

  return (
    <div className="virtual-controller">
      {/* Left Section - D-Pad */}
      <div className="controller-section left">
        <div className="dpad">
          <button 
            className={`dpad-btn up ${isPressed('up') ? 'pressed' : ''}`}
            onMouseDown={() => handleMouseDown('up')}
            onMouseUp={() => handleMouseUp('up')}
            onMouseLeave={() => handleMouseUp('up')}
          >
            ↑
          </button>
          <button 
            className={`dpad-btn down ${isPressed('down') ? 'pressed' : ''}`}
            onMouseDown={() => handleMouseDown('down')}
            onMouseUp={() => handleMouseUp('down')}
            onMouseLeave={() => handleMouseUp('down')}
          >
            ↓
          </button>
          <button 
            className={`dpad-btn left ${isPressed('left') ? 'pressed' : ''}`}
            onMouseDown={() => handleMouseDown('left')}
            onMouseUp={() => handleMouseUp('left')}
            onMouseLeave={() => handleMouseUp('left')}
          >
            ←
          </button>
          <button 
            className={`dpad-btn right ${isPressed('right') ? 'pressed' : ''}`}
            onMouseDown={() => handleMouseDown('right')}
            onMouseUp={() => handleMouseUp('right')}
            onMouseLeave={() => handleMouseUp('right')}
          >
            →
          </button>
        </div>
        <div className="stick-label">Left Stick</div>
      </div>

      {/* Center Section - System Buttons */}
      <div className="controller-section center">
        <button 
          className={`system-btn select ${isPressed('select') ? 'pressed' : ''}`}
          onMouseDown={() => handleMouseDown('select')}
          onMouseUp={() => handleMouseUp('select')}
        >
          SELECT
        </button>
        <div className="ps-logo">PS2</div>
        <button 
          className={`system-btn start ${isPressed('start') ? 'pressed' : ''}`}
          onMouseDown={() => handleMouseDown('start')}
          onMouseUp={() => handleMouseUp('start')}
        >
          START
        </button>
      </div>

      {/* Right Section - Face Buttons */}
      <div className="controller-section right">
        <div className="face-buttons">
          <button 
            className={`face-btn triangle ${isPressed('triangle') ? 'pressed' : ''}`}
            onMouseDown={() => handleMouseDown('triangle')}
            onMouseUp={() => handleMouseUp('triangle')}
            onMouseLeave={() => handleMouseUp('triangle')}
          >
            △
          </button>
          <button 
            className={`face-btn square ${isPressed('square') ? 'pressed' : ''}`}
            onMouseDown={() => handleMouseDown('square')}
            onMouseUp={() => handleMouseUp('square')}
            onMouseLeave={() => handleMouseUp('square')}
          >
            □
          </button>
          <button 
            className={`face-btn circle ${isPressed('circle') ? 'pressed' : ''}`}
            onMouseDown={() => handleMouseDown('circle')}
            onMouseUp={() => handleMouseUp('circle')}
            onMouseLeave={() => handleMouseUp('circle')}
          >
            ○
          </button>
          <button 
            className={`face-btn cross ${isPressed('cross') ? 'pressed' : ''}`}
            onMouseDown={() => handleMouseDown('cross')}
            onMouseUp={() => handleMouseUp('cross')}
            onMouseLeave={() => handleMouseUp('cross')}
          >
            ✕
          </button>
        </div>
        <div className="stick-label">Right Stick</div>
      </div>

      {/* Shoulder Buttons */}
      <div className="shoulder-buttons">
        <div className="shoulder-left">
          <button 
            className={`shoulder-btn l1 ${isPressed('l1') ? 'pressed' : ''}`}
            onMouseDown={() => handleMouseDown('l1')}
            onMouseUp={() => handleMouseUp('l1')}
          >
            L1
          </button>
          <button 
            className={`shoulder-btn l2 ${isPressed('l2') ? 'pressed' : ''}`}
            onMouseDown={() => handleMouseDown('l2')}
            onMouseUp={() => handleMouseUp('l2')}
          >
            L2
          </button>
        </div>
        <div className="shoulder-right">
          <button 
            className={`shoulder-btn r1 ${isPressed('r1') ? 'pressed' : ''}`}
            onMouseDown={() => handleMouseDown('r1')}
            onMouseUp={() => handleMouseUp('r1')}
          >
            R1
          </button>
          <button 
            className={`shoulder-btn r2 ${isPressed('r2') ? 'pressed' : ''}`}
            onMouseDown={() => handleMouseDown('r2')}
            onMouseUp={() => handleMouseUp('r2')}
          >
            R2
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualController;