import React from 'react';
import './styles.css';

interface PositionToggleProps {
  position: 'top' | 'side';
  onToggle: () => void;
}

export const PositionToggle: React.FC<PositionToggleProps> = ({
  position,
  onToggle,
}) => {
  return (
    <button
      className="position-toggle"
      onClick={onToggle}
      title={position === 'top' ? 'Mudar para menu lateral' : 'Mudar para menu superior'}
    >
      {position === 'top' ? '⬅️' : '⬆️'}
    </button>
  );
}; 