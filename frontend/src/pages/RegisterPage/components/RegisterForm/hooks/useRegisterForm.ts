import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRegisterForm } from '../../../../../interfaces/auth';
import { AuthService } from '../../../../../services/AuthService';
import { REGISTER_MESSAGES } from '../../../constants';
import { validateRegisterForm } from '../../../utils/validateRegisterForm';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<IRegisterForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    captcha: '',
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof IRegisterForm) => (
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
      const validationErrors = validateRegisterForm(form);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0].message);
      }

      await AuthService.getInstance().register(form);
      navigate('/login', { state: { message: REGISTER_MESSAGES.SUCCESS.REGISTER } });
    } catch (err) {
      setError(err instanceof Error ? err.message : REGISTER_MESSAGES.ERROR.DEFAULT);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  };
}; 