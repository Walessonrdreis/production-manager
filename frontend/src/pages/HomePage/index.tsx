import React from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import './styles.css';

export const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="home-container">
        <h1 className="home-title">Bem-vindo ao Production Manager</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-title">Pedidos Hoje</h3>
            <p className="stat-value">15</p>
          </div>
          
          <div className="stat-card">
            <h3 className="stat-title">Produtos Ativos</h3>
            <p className="stat-value">128</p>
          </div>
          
          <div className="stat-card">
            <h3 className="stat-title">Clientes</h3>
            <p className="stat-value">543</p>
          </div>
          
          <div className="stat-card">
            <h3 className="stat-title">Faturamento Mensal</h3>
            <p className="stat-value">R$ 45.678,90</p>
          </div>
        </div>

        <div className="recent-activity">
          <h2 className="section-title">Atividades Recentes</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">📦</span>
              <div className="activity-content">
                <p className="activity-text">Novo pedido #1234 recebido</p>
                <span className="activity-time">Há 5 minutos</span>
              </div>
            </div>
            
            <div className="activity-item">
              <span className="activity-icon">✅</span>
              <div className="activity-content">
                <p className="activity-text">Pedido #1230 concluído</p>
                <span className="activity-time">Há 1 hora</span>
              </div>
            </div>
            
            <div className="activity-item">
              <span className="activity-icon">👤</span>
              <div className="activity-content">
                <p className="activity-text">Novo cliente cadastrado</p>
                <span className="activity-time">Há 2 horas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}; 