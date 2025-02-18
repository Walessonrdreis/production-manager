import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import api from '../../../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  sales: {
    labels: string[];
    data: number[];
  };
  users: {
    labels: string[];
    data: number[];
  };
}

export const DashboardCharts: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const response = await api.get<ChartData>('/dashboard/charts');
        setChartData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erro ao carregar dados dos gráficos');
        console.error('Erro ao buscar dados dos gráficos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return <div className="charts-loading">Carregando gráficos...</div>;
  }

  if (error) {
    return <div className="charts-error">Erro: {error}</div>;
  }

  if (!chartData) {
    return <div className="charts-error">Dados não encontrados</div>;
  }

  const salesChartData = {
    labels: chartData.sales.labels,
    datasets: [
      {
        label: 'Vendas',
        data: chartData.sales.data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const usersChartData = {
    labels: chartData.users.labels,
    datasets: [
      {
        label: 'Usuários',
        data: chartData.users.data,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h3>Vendas por Mês</h3>
        <Line data={salesChartData} options={options} />
      </div>
      
      <div className="chart-card">
        <h3>Novos Usuários por Mês</h3>
        <Line data={usersChartData} options={options} />
      </div>
    </div>
  );
}; 