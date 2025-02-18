import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

interface Metrics {
  users: {
    total: number;
    active: number;
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
  };
  products: {
    total: number;
    lowStock: number;
  };
  revenue: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

export const DashboardMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const response = await api.get<Metrics>('/dashboard/metrics');
        setMetrics(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erro ao carregar métricas');
        console.error('Erro ao buscar métricas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="metrics-loading">Carregando métricas...</div>;
  }

  if (error) {
    return <div className="metrics-error">Erro: {error}</div>;
  }

  if (!metrics) {
    return <div className="metrics-error">Dados não encontrados</div>;
  }

  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <h3>Usuários</h3>
        <div className="metric-values">
          <div className="metric-item">
            <span className="metric-label">Total:</span>
            <span className="metric-value">{metrics.users.total}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Ativos:</span>
            <span className="metric-value">{metrics.users.active}</span>
          </div>
        </div>
      </div>

      <div className="metric-card">
        <h3>Pedidos</h3>
        <div className="metric-values">
          <div className="metric-item">
            <span className="metric-label">Total:</span>
            <span className="metric-value">{metrics.orders.total}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Pendentes:</span>
            <span className="metric-value">{metrics.orders.pending}</span>
          </div>
        </div>
      </div>

      <div className="metric-card">
        <h3>Produtos</h3>
        <div className="metric-values">
          <div className="metric-item">
            <span className="metric-label">Total:</span>
            <span className="metric-value">{metrics.products.total}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Baixo Estoque:</span>
            <span className="metric-value">{metrics.products.lowStock}</span>
          </div>
        </div>
      </div>

      <div className="metric-card">
        <h3>Faturamento</h3>
        <div className="metric-values">
          <div className="metric-item">
            <span className="metric-label">Diário:</span>
            <span className="metric-value">R$ {metrics.revenue.daily.toFixed(2)}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Mensal:</span>
            <span className="metric-value">R$ {metrics.revenue.monthly.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 