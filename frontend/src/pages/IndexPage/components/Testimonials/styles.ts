import styled from 'styled-components';

export const Container = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

export const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
`;

export const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  img {
    width: 48px;
    height: 48px;
    border-radius: ${({ theme }) => theme.borderRadius.round};
  }

  .author-info {
    h4 {
      font-size: 1rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.text};
    }

    span {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.textLight};
    }
  }
`; 