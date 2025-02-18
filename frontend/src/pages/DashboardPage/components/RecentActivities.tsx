import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

interface Activity {
  id: string;
  type: string;
  action: string;
  description: string;
  date: string;
  user: string;
}

export const RecentActivities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get<Activity[]>('/dashboard/activities');
        setActivities(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erro ao carregar atividades');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="activities-loading">Carregando atividades...</div>;
  if (error) return <div className="activities-error">{error}</div>;
  if (!activities.length) return <div className="activities-empty">Nenhuma atividade recente</div>;

  return (
    <div className="activities-list">
      {activities.map(activity => (
        <div key={activity.id} className="activity-item">
          <p>{activity.description}</p>
          <span>{new Date(activity.date).toLocaleDateString('pt-BR')}</span>
        </div>
      ))}
    </div>
  );
}; 