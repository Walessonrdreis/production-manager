import React from 'react';
import { Button } from '../../components/Button';
import {
  Container,
  Header,
  Logo,
  MainContent,
  ContentLeft,
  ContentRight,
  Title,
  Description,
  ButtonContainer,
  LanguageSelector,
  BenefitsSection,
  BenefitsContainer,
  BenefitsTitle,
  BenefitsGrid,
  BenefitCard,
  FeaturesSection,
  SectionTitle,
  FeaturesGrid,
  FeatureCard,
  TestimonialsSection,
  TestimonialsContainer,
  TestimonialGrid,
  TestimonialCard,
  TestimonialAuthor,
  Footer,
  FooterContent,
  FooterLogo,
  FooterColumn,
  FooterBottom,
  FooterCopyright,
  FooterSocial
} from './styles';
import './IndexPage.css';

const features = [
  { icon: '/icons/feature1.svg', title: 'Controle de NFe' },
  { icon: '/icons/feature2.svg', title: 'Gestão de Estoque' },
  { icon: '/icons/feature3.svg', title: 'Gestão de Vendas Online' },
  { icon: '/icons/feature4.svg', title: 'Fluxo Gerencial de Vendas' },
  { icon: '/icons/feature5.svg', title: 'Relatórios e Insights' },
  { icon: '/icons/feature6.svg', title: 'Gestão de Produção' },
  { icon: '/icons/feature7.svg', title: 'Lista de Produtos' },
  { icon: '/icons/feature8.svg', title: 'Gestão de Marketing' },
  { icon: '/icons/feature9.svg', title: 'Auto Postagem' },
  { icon: '/icons/feature10.svg', title: 'Editor de Imagens' },
  { icon: '/icons/feature11.svg', title: 'Preço Básico' },
  { icon: '/icons/feature12.svg', title: 'Receber Imagens' },
  { icon: '/icons/feature13.svg', title: 'Simulador Preço' },
  { icon: '/icons/feature14.svg', title: 'Relatórios' },
  { icon: '/icons/feature15.svg', title: 'Expedição' }
];

const testimonials = [
  {
    content: 'Eu utilizo o Production Manager para gerenciar minha produção e estou muito satisfeito. A plataforma é intuitiva e me ajuda a manter tudo organizado.',
    author: {
      name: 'João Silva',
      role: 'Gerente de Produção',
      avatar: '/avatars/joao.jpg'
    }
  },
  {
    content: 'O sistema é completo e atende todas as minhas necessidades. O suporte é excelente e sempre me ajuda quando preciso.',
    author: {
      name: 'Maria Santos',
      role: 'Coordenadora de Operações',
      avatar: '/avatars/maria.jpg'
    }
  },
  {
    content: 'Excelente plataforma para gerenciamento de produção. Recomendo para todas as empresas que buscam organização e eficiência.',
    author: {
      name: 'Pedro Costa',
      role: 'Diretor Industrial',
      avatar: '/avatars/pedro.jpg'
    }
  }
];

const benefits = [
  {
    image: '/images/omnichannel.svg',
    title: 'Publicações Omni-channel',
    description: 'Administre todas as suas lojas online em um só lugar'
  },
  {
    image: '/images/orders.svg',
    title: 'Gerenciamento de Pedidos',
    description: 'Processe pedidos e imprima etiquetas facilmente'
  },
  {
    image: '/images/inventory.svg',
    title: 'Estoque',
    description: 'Gerencie seus níveis de estoque através do seu armazém'
  }
];

export const IndexPage: React.FC = () => {
  return (
    <Container className="index-page-container">
      <Header className="header-animation">
        <Logo>Production Manager</Logo>
        <nav>
          <a href="#integrações">Integrações</a>
          <a href="#suporte">Suporte</a>
          <a href="#blog">Blog</a>
          <a href="#empresa">Empresa</a>
          <LanguageSelector>
            PT
            <span>▼</span>
          </LanguageSelector>
          <Button variant="secondary" onClick={() => console.log('Login')}>
            Login
          </Button>
          <Button variant="primary" onClick={() => console.log('Cadastro')}>
            Cadastre-se Grátis
          </Button>
        </nav>
      </Header>

      <MainContent className="content-animation">
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
              onClick={() => console.log('Cadastro')}
              className="button-hover-effect"
            >
              Cadastre-se Grátis
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => console.log('Saiba mais')}
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
      </MainContent>

      <BenefitsSection>
        <BenefitsContainer>
          <BenefitsTitle>
            <h2>
              A Maneira Mais Fácil de Gerenciar Produtos e Pedidos
              <span className="gratis">GRÁTIS</span>
            </h2>
          </BenefitsTitle>
          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} className="benefit-card">
                <img src={benefit.image} alt={benefit.title} />
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </BenefitsContainer>
      </BenefitsSection>

      <FeaturesSection>
        <SectionTitle>O que você também pode fazer no Production Manager</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <img src={feature.icon} alt={feature.title} />
              <h3>{feature.title}</h3>
            </FeatureCard>
          ))}
        </FeaturesGrid>
        <ButtonContainer style={{ justifyContent: 'center', marginTop: '2rem' }}>
          <Button 
            variant="primary" 
            onClick={() => console.log('Cadastro')}
            className="button-hover-effect"
          >
            Cadastre-se Grátis
          </Button>
        </ButtonContainer>
      </FeaturesSection>

      <TestimonialsSection>
        <TestimonialsContainer>
          <SectionTitle>Do porquê os Vendedores amam o Production Manager?</SectionTitle>
          <TestimonialGrid>
            {testimonials.map((testimonial, index) => (
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
      </TestimonialsSection>

      <Footer>
        <FooterContent>
          <FooterLogo>
            <img src="/logo-white.svg" alt="Production Manager" />
            <p>
              UpSeller é uma empresa brasileira que desenvolve soluções para gestão de produção.
              Nossa missão é simplificar e otimizar os processos produtivos das empresas.
            </p>
          </FooterLogo>

          <FooterColumn>
            <h3>Integrações</h3>
            <ul>
              <li><a href="#mercado-livre">Mercado Livre</a></li>
              <li><a href="#shopify">Shopify</a></li>
              <li><a href="#bling">Bling</a></li>
              <li><a href="#tiny">Tiny</a></li>
              <li><a href="#nuvemshop">Nuvemshop</a></li>
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h3>Suporte</h3>
            <ul>
              <li><a href="#central-de-ajuda">Central de Ajuda</a></li>
              <li><a href="#tutoriais">Tutoriais</a></li>
              <li><a href="#contato">Contato</a></li>
              <li><a href="#status">Status</a></li>
              <li><a href="#calculadora">Calculadora de Crédito</a></li>
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h3>Proteção</h3>
            <ul>
              <li><a href="#privacidade">Política de Privacidade</a></li>
              <li><a href="#termos">Termos de Uso</a></li>
              <li><a href="#cookies">Política de Cookies</a></li>
              <li><a href="#seguranca">Segurança</a></li>
            </ul>
          </FooterColumn>
        </FooterContent>

        <FooterBottom>
          <FooterCopyright>
            © 2024 Production Manager. Todos os direitos reservados.
          </FooterCopyright>
          <FooterSocial>
            <a href="#facebook" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#instagram" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#twitter" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#linkedin" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#youtube" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </FooterSocial>
        </FooterBottom>
      </Footer>
    </Container>
  );
}; 