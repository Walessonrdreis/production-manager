import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItems } from '../MenuItems';
import { MenuToggle } from '../MenuToggle';
import { PositionToggle } from '../PositionToggle';
import './styles.css';

interface NavbarProps {
  isOpen: boolean;
  position: 'top' | 'side';
  onToggle: () => void;
  onPositionChange: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isOpen,
  position,
  onToggle,
  onPositionChange,
}) => {
  const navigate = useNavigate();

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <MenuToggle isOpen={isOpen} onToggle={onToggle} />
          <div className="navbar-brand" onClick={() => navigate('/')}>
            Production Manager
          </div>
        </div>

        <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          <MenuItems />
        </div>

        <div className="navbar-right">
          <PositionToggle position={position} onToggle={onPositionChange} />
          <button 
            className="navbar-profile"
            onClick={() => navigate('/profile')}
          >
            Perfil
          </button>
        </div>
      </div>
    </nav>
  );
}; 