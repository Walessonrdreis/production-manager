import styled from 'styled-components';

export const Container = styled.section`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

export const BenefitsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;

export const BenefitsTitle = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  h2 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: bold;
  }

  span.gratis {
    background: #FFD700;
    color: ${({ theme }) => theme.colors.text};
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: bold;
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

export const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const BenefitCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 180px;
    height: 180px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: bold;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textLight};
    line-height: 1.6;
  }
`; 