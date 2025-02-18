import React from 'react';
import { DashboardMetrics } from './components/DashboardMetrics';
import { RecentActivities } from './components/RecentActivities';
import { DashboardCharts } from './components/DashboardCharts';
import './styles.css';

export const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      <section className="metrics-section">
        <h2>Métricas Gerais</h2>
        <DashboardMetrics />
      </section>

      <div className="dashboard-grid">
        <section className="charts-section">
          <h2>Gráficos</h2>
          <DashboardCharts />
        </section>

        <section className="activities-section">
          <h2>Atividades Recentes</h2>
          <RecentActivities />
        </section>
      </div>
    </div>
  );
}; 