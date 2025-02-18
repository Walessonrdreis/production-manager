import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItems } from '../MenuItems';
import { MenuToggle } from '../MenuToggle';
import { PositionToggle } from '../PositionToggle';
import './styles.css';

interface SidebarProps {
  isOpen: boolean;
  position: 'top' | 'side';
  onToggle: () => void;
  onPositionChange: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  position,
  onToggle,
  onPositionChange,
}) => {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand" onClick={() => navigate('/')}>
          Production Manager
        </div>
        <MenuToggle isOpen={isOpen} onToggle={onToggle} />
      </div>

      <div className="sidebar-content">
        <MenuItems orientation="vertical" />
      </div>

      <div className="sidebar-footer">
        <PositionToggle position={position} onToggle={onPositionChange} />
        <button 
          className="sidebar-profile"
          onClick={() => navigate('/profile')}
        >
          Perfil
        </button>
      </div>
    </aside>
  );
}; 