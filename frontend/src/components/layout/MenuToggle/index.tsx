import React from 'react';
import './styles.css';

interface MenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ isOpen, onToggle }) => {
  return (
    <button 
      className={`menu-toggle ${isOpen ? 'open' : ''}`}
      onClick={onToggle}
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
    >
      <span className="menu-toggle-line" />
      <span className="menu-toggle-line" />
      <span className="menu-toggle-line" />
    </button>
  );
}; 