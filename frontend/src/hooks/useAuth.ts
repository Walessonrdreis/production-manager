import { useState, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

export function useAuth() {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ProductionManager:token');
    const user = localStorage.getItem('@ProductionManager:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: { email: string; password: string }) => {
    // Implementar lógica de autenticação aqui
    // const response = await api.post('/sessions', { email, password });
    // const { token, user } = response.data;
    
    // localStorage.setItem('@ProductionManager:token', token);
    // localStorage.setItem('@ProductionManager:user', JSON.stringify(user));
    
    // setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ProductionManager:token');
    localStorage.removeItem('@ProductionManager:user');

    setData({} as AuthState);
  }, []);

  return { user: data.user, signIn, signOut };
} 