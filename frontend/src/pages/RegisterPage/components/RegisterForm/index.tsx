import React from 'react';
import { useRegisterForm } from './hooks/useRegisterForm';
import { REGISTER_FORM_LABELS } from '../../constants';

export const RegisterForm: React.FC = () => {
  const {
    form,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  } = useRegisterForm();

  return (
    <div>
      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            {REGISTER_FORM_LABELS.NAME}
          </label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={handleInputChange('name')}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            {REGISTER_FORM_LABELS.EMAIL}
          </label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleInputChange('email')}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            {REGISTER_FORM_LABELS.PASSWORD}
          </label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={handleInputChange('password')}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            {REGISTER_FORM_LABELS.CONFIRM_PASSWORD}
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="captcha" className="form-label">
            {REGISTER_FORM_LABELS.CAPTCHA}
          </label>
          <div className="captcha-container">
            <input
              type="text"
              id="captcha"
              value={form.captcha}
              onChange={handleInputChange('captcha')}
              className="form-input"
              required
            />
            <div className="captcha-preview">
              {/* TODO: Implementar CAPTCHA */}
              CAPTCHA
            </div>
          </div>
        </div>

        <div className="form-checkbox-group">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={form.acceptTerms}
            onChange={handleInputChange('acceptTerms')}
            className="form-checkbox"
            required
          />
          <label htmlFor="acceptTerms" className="form-checkbox-label">
            {REGISTER_FORM_LABELS.ACCEPT_TERMS}
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="form-button"
        >
          {loading ? REGISTER_FORM_LABELS.LOADING : REGISTER_FORM_LABELS.SUBMIT}
        </button>
      </form>
    </div>
  );
}; 