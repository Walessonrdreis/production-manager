import React from 'react';
import { Button } from '../../../../components/Button';
import {
  Container,
  SectionTitle,
  FeaturesGrid,
  FeatureCard,
  ButtonContainer
} from './styles';
import { FEATURES } from '../../constants';

export const Features: React.FC = () => {
  return (
    <Container>
      <SectionTitle>O que você também pode fazer no Production Manager</SectionTitle>
      <FeaturesGrid>
        {FEATURES.map((feature, index) => (
          <FeatureCard key={index}>
            <img src={feature.icon} alt={feature.title} />
            <h3>{feature.title}</h3>
          </FeatureCard>
        ))}
      </FeaturesGrid>
      <ButtonContainer>
        <Button 
          variant="primary" 
          onClick={() => console.log('Cadastro')}
          className="button-hover-effect"
        >
          Cadastre-se Grátis
        </Button>
      </ButtonContainer>
    </Container>
  );
}; 