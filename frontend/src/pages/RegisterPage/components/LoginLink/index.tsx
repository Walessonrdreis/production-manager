import React from 'react';
import { useNavigate } from 'react-router-dom';
import { REGISTER_FORM_LABELS } from '../../constants';

export const LoginLink: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="form-group text-center">
      <button
        type="button"
        onClick={handleLogin}
        className="form-button secondary"
      >
        {REGISTER_FORM_LABELS.LOGIN}
      </button>
    </div>
  );
}; 