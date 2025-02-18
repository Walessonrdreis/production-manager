import React, { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { useLayout } from './hooks/useLayout';
import './styles.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { 
    isMenuOpen, 
    menuPosition,
    toggleMenu,
    toggleMenuPosition 
  } = useLayout();

  return (
    <div className="layout-container">
      {menuPosition === 'top' ? (
        <>
          <Navbar 
            isOpen={isMenuOpen} 
            onToggle={toggleMenu}
            onPositionChange={toggleMenuPosition}
            position={menuPosition}
          />
          <main className="main-content top-menu">
            {children}
          </main>
        </>
      ) : (
        <div className={`layout-with-sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
          <Sidebar 
            isOpen={isMenuOpen} 
            onToggle={toggleMenu}
            onPositionChange={toggleMenuPosition}
            position={menuPosition}
          />
          <main className="main-content side-menu">
            {children}
          </main>
        </div>
      )}
    </div>
  );
}; 