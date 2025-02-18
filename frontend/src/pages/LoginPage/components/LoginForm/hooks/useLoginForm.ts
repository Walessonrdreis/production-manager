import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MESSAGES, LOGIN_ROUTES } from '../../../constants';

interface LoginForm {
  email: string;
  password: string;
  captcha: string;
  rememberMe: boolean;
}

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    captcha: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof LoginForm) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!form.captcha) {
        throw new Error(LOGIN_MESSAGES.ERROR.CAPTCHA_REQUIRED);
      }

      // TODO: Implementar chamada à API de autenticação
      console.log('Dados do formulário:', form);
      
      // Simular delay de autenticação
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simular validação de credenciais
      if (form.email === 'admin@example.com' && form.password === 'admin') {
        navigate(LOGIN_ROUTES.DASHBOARD);
      } else {
        throw new Error(LOGIN_MESSAGES.ERROR.INVALID_CREDENTIALS);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : LOGIN_MESSAGES.ERROR.DEFAULT);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate(LOGIN_ROUTES.FORGOT_PASSWORD);
  };

  return {
    form,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    handleForgotPassword,
  };
}; 