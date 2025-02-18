import React from 'react';
import {
  Container,
  TestimonialsContainer,
  SectionTitle,
  TestimonialGrid,
  TestimonialCard,
  TestimonialAuthor
} from './styles';
import { TESTIMONIALS } from '../../constants';

export const Testimonials: React.FC = () => {
  return (
    <Container>
      <TestimonialsContainer>
        <SectionTitle>Do porquê os Vendedores amam o Production Manager?</SectionTitle>
        <TestimonialGrid>
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <p>{testimonial.content}</p>
              <TestimonialAuthor>
                <img src={testimonial.author.avatar} alt={testimonial.author.name} />
                <div className="author-info">
                  <h4>{testimonial.author.name}</h4>
                  <span>{testimonial.author.role}</span>
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </TestimonialsContainer>
    </Container>
  );
}; 