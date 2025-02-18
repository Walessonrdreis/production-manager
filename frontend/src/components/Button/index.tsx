import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  ...rest 
}) => {
  return (
    <Container variant={variant} disabled={isLoading} {...rest}>
      {isLoading ? 'Carregando...' : children}
    </Container>
  );
}; 