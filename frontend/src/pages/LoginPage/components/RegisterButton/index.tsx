import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_FORM_LABELS, LOGIN_ROUTES } from '../../constants';

export const RegisterButton: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate(LOGIN_ROUTES.REGISTER);
  };

  return (
    <div className="register-container">
      <button
        type="button"
        onClick={handleRegister}
        className="register-button"
      >
        {LOGIN_FORM_LABELS.REGISTER}
      </button>
    </div>
  );
}; 