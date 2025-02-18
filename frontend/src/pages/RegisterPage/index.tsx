import React from 'react';
import { AuthFormContainer } from '../../components/common/AuthFormContainer';
import { RegisterForm } from './components/RegisterForm';
import { LoginLink } from './components/LoginLink';

export const RegisterPage: React.FC = () => {
  return (
    <AuthFormContainer title="Criar Conta">
      <RegisterForm />
      <LoginLink />
    </AuthFormContainer>
  );
}; 