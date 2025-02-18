import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(data: SignUpData): Promise<void>;
  signOut(): void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ProductionManager:token');
    const user = localStorage.getItem('@ProductionManager:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post('/users/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('@ProductionManager:token', token);
      localStorage.setItem('@ProductionManager:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ token, user });
    } catch (error) {
      throw new Error('Erro ao fazer login. Verifique suas credenciais.');
    }
  }, []);

  const signUp = useCallback(async ({ name, email, password }: SignUpData) => {
    try {
      // Validações básicas
      if (!password || typeof password !== 'string' || password.trim() === '') {
        throw new Error('Senha inválida');
      }

      if (!email || typeof email !== 'string' || email.trim() === '') {
        throw new Error('Email inválido');
      }

      if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new Error('Nome inválido');
      }

      const userData = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        role: 'user'
      };

      console.log('Enviando dados para registro:', {
        ...userData,
        password: '[PRESENTE]'
      });

      const response = await api.post('/users/register', userData);
      console.log('Resposta do registro:', response.data);
    } catch (error: any) {
      console.error('Erro detalhado:', error.response?.data || error.message);
      
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Erro ao criar conta. Por favor, tente novamente.');
      }
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ProductionManager:token');
    localStorage.removeItem('@ProductionManager:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user: data.user, 
        signIn, 
        signUp, 
        signOut,
        isAuthenticated: !!data.user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
} 