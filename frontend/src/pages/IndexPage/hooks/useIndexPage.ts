import { useCallback } from 'react';

export const useIndexPage = () => {
  const handleLogin = useCallback(() => {
    console.log('Login');
    // Implementar lógica de login
  }, []);

  const handleRegister = useCallback(() => {
    console.log('Cadastro');
    // Implementar lógica de cadastro
  }, []);

  const handleLearnMore = useCallback(() => {
    console.log('Saiba mais');
    // Implementar lógica de redirecionamento
  }, []);

  return {
    handleLogin,
    handleRegister,
    handleLearnMore
  };
}; 