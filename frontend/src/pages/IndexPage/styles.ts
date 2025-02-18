import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #4B0082 0%, #6A5ACD 100%);
  color: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xxl};
  
  nav {
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
    align-items: center;
  }

  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    font-size: 1rem;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

export const MainContent = styled.main`
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

export const FeaturesSection = styled.section`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};

  img {
    width: 48px;
    height: 48px;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h3 {
    font-size: 1rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const TestimonialsSection = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

export const TestimonialsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
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

export const LanguageSelector = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const Footer = styled.footer`
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

export const BenefitsSection = styled.section`
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