import React from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterButton } from './components/RegisterButton';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Login</h1>
        </div>
        
        <LoginForm />
        <RegisterButton />
      </div>
    </div>
  );
}; 