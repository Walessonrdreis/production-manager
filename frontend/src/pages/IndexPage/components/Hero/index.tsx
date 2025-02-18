import React from 'react';
import { Button } from '../../../../components/Button';
import {
  Container,
  ContentLeft,
  ContentRight,
  Title,
  Description,
  ButtonContainer
} from './styles';
import { HeroProps } from './types';

export const Hero: React.FC<HeroProps> = ({ onRegister, onLearnMore }) => {
  return (
    <Container className="content-animation">
      <ContentLeft>
        <Title>
          Simplifique Suas Operações de Produção
        </Title>
        <Description>
          Production Manager é a maneira mais fácil para os gestores gerenciarem seus processos de produção — tudo a partir de uma plataforma única e centralizada.
        </Description>
        <ButtonContainer>
          <Button 
            variant="primary" 
            onClick={onRegister}
            className="button-hover-effect"
          >
            Cadastre-se Grátis
          </Button>
          <Button 
            variant="secondary" 
            onClick={onLearnMore}
            className="button-hover-effect"
          >
            Saiba Mais
          </Button>
        </ButtonContainer>
      </ContentLeft>

      <ContentRight>
        <img 
          src="/dashboard-preview.png" 
          alt="Preview do dashboard do sistema" 
          className="dashboard-animation"
        />
      </ContentRight>
    </Container>
  );
}; 