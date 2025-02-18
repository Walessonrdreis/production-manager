import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './UserProfile.css';

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export const UserProfile: React.FC = () => {
  const { user: authUser } = useAuth();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get<UserProfileData>('/users/profile');
        setProfileData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erro ao carregar perfil');
        console.error('Erro ao buscar perfil:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="profile-loading">Carregando perfil...</div>;
  }

  if (error) {
    return <div className="profile-error">Erro: {error}</div>;
  }

  if (!profileData) {
    return <div className="profile-error">Dados do perfil não encontrados</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Perfil do Usuário</h2>
      </div>
      
      <div className="profile-content">
        <div className="profile-info">
          <div className="info-group">
            <label>Nome:</label>
            <span>{profileData.name}</span>
          </div>
          
          <div className="info-group">
            <label>E-mail:</label>
            <span>{profileData.email}</span>
          </div>
          
          <div className="info-group">
            <label>Função:</label>
            <span>{profileData.role === 'admin' ? 'Administrador' : 'Usuário'}</span>
          </div>
          
          <div className="info-group">
            <label>Membro desde:</label>
            <span>{new Date(profileData.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 