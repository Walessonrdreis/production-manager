import { useState, useEffect } from 'react';

type MenuPosition = 'top' | 'side';

export const useLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>('side');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsMenuOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const toggleMenuPosition = () => {
    setMenuPosition(prev => prev === 'top' ? 'side' : 'top');
    setIsMenuOpen(true);
  };

  return {
    isMenuOpen,
    menuPosition,
    isMobile,
    toggleMenu,
    toggleMenuPosition,
  };
}; 