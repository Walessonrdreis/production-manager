import React from 'react';
import { Button } from '../../components/Button';
import { Container, Header, Content, Title, Description } from './styles';
import './IndexPage.css';

export const IndexPage: React.FC = () => {
  return (
    <Container className="index-page-container">
      <Header className="header-animation">
        <Title>Sistema de Gerenciamento de Produção</Title>
        <Description>
          Gerencie sua produção de forma eficiente e organizada
        </Description>
      </Header>

      <Content className="content-animation">
        <Button 
          variant="primary" 
          onClick={() => console.log('Iniciar')}
          className="button-hover-effect"
        >
          Iniciar Agora
        </Button>

        <Button 
          variant="secondary" 
          onClick={() => console.log('Saiba mais')}
          className="button-hover-effect"
        >
          Saiba Mais
        </Button>
      </Content>
    </Container>
  );
}; 