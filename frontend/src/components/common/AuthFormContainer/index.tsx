import React from 'react';
import './styles.css';

interface AuthFormContainerProps {
  title: string;
  children: React.ReactNode;
}

export const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  children
}) => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}; 