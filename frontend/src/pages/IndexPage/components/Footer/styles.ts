import styled from 'styled-components';

export const Container = styled.footer`
  background: #1E1E2D;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.white};
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const FooterLogo = styled.div`
  img {
    height: 40px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  p {
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.7;
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const FooterColumn = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.1rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.7;
    text-decoration: none;
    transition: opacity 0.2s;
    font-size: 0.9rem;

    &:hover {
      opacity: 1;
    }
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: ${({ theme }) => theme.spacing.xxl} auto 0;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
    text-align: center;
  }
`;

export const FooterCopyright = styled.p`
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.7;
  font-size: 0.9rem;
`;

export const FooterSocial = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  a {
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`; 