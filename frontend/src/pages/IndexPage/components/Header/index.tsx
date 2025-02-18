import React from 'react';
import { Button } from '../../../../components/Button';
import { Container, Logo, Nav, LanguageSelector } from './styles';
import { HeaderProps } from './types';

export const Header: React.FC<HeaderProps> = ({ onLogin, onRegister }) => {
  return (
    <Container className="header-animation">
      <Logo>Production Manager</Logo>
      <Nav>
        <a href="#integrações">Integrações</a>
        <a href="#suporte">Suporte</a>
        <a href="#blog">Blog</a>
        <a href="#empresa">Empresa</a>
        <LanguageSelector>
          PT
          <span>▼</span>
        </LanguageSelector>
        <Button variant="secondary" onClick={onLogin}>
          Login
        </Button>
        <Button variant="primary" onClick={onRegister}>
          Cadastre-se Grátis
        </Button>
      </Nav>
    </Container>
  );
}; 