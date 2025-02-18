import React from 'react';
import {
  Container,
  FooterContent,
  FooterLogo,
  FooterColumn,
  FooterBottom,
  FooterCopyright,
  FooterSocial
} from './styles';

export const Footer: React.FC = () => {
  return (
    <Container>
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
    </Container>
  );
}; 