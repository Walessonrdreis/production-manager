import React from 'react';
import { Container } from './styles';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { useIndexPage } from './hooks/useIndexPage';
import './IndexPage.css';

export const IndexPage: React.FC = () => {
  const { handleLogin, handleRegister, handleLearnMore } = useIndexPage();

  return (
    <Container className="index-page-container">
      <Header 
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <Hero 
        onRegister={handleRegister}
        onLearnMore={handleLearnMore}
      />

      <Benefits />
      <Features />
      <Testimonials />
      <Footer />
    </Container>
  );
}; 