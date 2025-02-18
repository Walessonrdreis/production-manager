import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from './constants';
import './styles.css';

interface MenuItemsProps {
  orientation?: 'horizontal' | 'vertical';
}

export const MenuItems: React.FC<MenuItemsProps> = ({ 
  orientation = 'horizontal' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ul className={`menu-items ${orientation}`}>
      {MENU_ITEMS.map((item) => (
        <li 
          key={item.path}
          className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          {item.icon && <span className="menu-item-icon">{item.icon}</span>}
          <span className="menu-item-text">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}; 