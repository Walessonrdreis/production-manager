import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: #1a1a1a;
  color: white;
  padding: 2rem 1rem;
`;

const Content = styled.main`
  flex: 1;
  background-color: #f5f5f5;
  padding: 2rem;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li<{ active?: boolean }>`
  margin-bottom: 0.5rem;
  
  a {
    display: block;
    padding: 0.8rem 1rem;
    color: ${props => props.active ? '#fff' : '#ccc'};
    text-decoration: none;
    border-radius: 4px;
    background-color: ${props => props.active ? '#333' : 'transparent'};
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #333;
      color: #fff;
    }
  }
`;

const UserInfo = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;
  
  h3 {
    margin: 0;
    color: #fff;
  }
  
  span {
    color: #ccc;
    font-size: 0.9rem;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/products', label: 'Produtos' },
    { path: '/orders', label: 'Pedidos' },
    { path: '/customers', label: 'Clientes' },
    { path: '/reports', label: 'Relatórios' },
    { path: '/profile', label: 'Meu Perfil' },
    { path: '/settings', label: 'Configurações' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  return (
    <LayoutContainer>
      <Sidebar>
        <UserInfo>
          <h3>{user?.name}</h3>
          <span>{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</span>
        </UserInfo>
        
        <MenuList>
          {menuItems.map((item) => (
            <MenuItem key={item.path} active={location.pathname === item.path}>
              <a onClick={() => handleNavigate(item.path)}>
                {item.label}
              </a>
            </MenuItem>
          ))}
          <MenuItem>
            <a onClick={handleLogout} style={{ color: '#ff4d4d' }}>
              Sair
            </a>
          </MenuItem>
        </MenuList>
      </Sidebar>
      
      <Content>
        {children}
      </Content>
    </LayoutContainer>
  );
}; 