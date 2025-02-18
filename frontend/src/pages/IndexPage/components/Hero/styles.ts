import styled from 'styled-components';

export const Container = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xxl};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

export const ContentLeft = styled.div`
  max-width: 600px;
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.2;
`;

export const Description = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.9;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.5;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
  }
`;

export const ContentRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;

  img {
    width: 100%;
    height: auto;
  }
`; 