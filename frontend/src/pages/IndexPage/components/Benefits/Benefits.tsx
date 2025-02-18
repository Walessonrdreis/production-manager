import React from 'react';
import {
  Container,
  BenefitsContainer,
  BenefitsTitle,
  BenefitsGrid,
  BenefitCard
} from './styles';
import { BENEFITS } from '../../constants';

export const Benefits: React.FC = () => {
  return (
    <Container>
      <BenefitsContainer>
        <BenefitsTitle>
          <h2>
            A Maneira Mais Fácil de Gerenciar Produtos e Pedidos
            <span className="gratis">GRÁTIS</span>
          </h2>
        </BenefitsTitle>
        <BenefitsGrid>
          {BENEFITS.map((benefit, index) => (
            <BenefitCard key={index} className="benefit-card">
              <img src={benefit.image} alt={benefit.title} />
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </BenefitsContainer>
    </Container>
  );
}; 