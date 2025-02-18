import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useIndexPage = () => {
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleRegister = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  const handleLearnMore = useCallback(() => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return {
    handleLogin,
    handleRegister,
    handleLearnMore
  };
}; 