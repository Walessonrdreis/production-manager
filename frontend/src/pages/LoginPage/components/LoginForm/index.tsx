import React from 'react';
import { useLoginForm } from './hooks/useLoginForm';
import { LOGIN_FORM_LABELS } from '../../constants';

export const LoginForm: React.FC = () => {
  const {
    form,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    handleForgotPassword,
  } = useLoginForm();

  return (
    <div>
      {error && (
        <div className="login-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            {LOGIN_FORM_LABELS.EMAIL}
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
            {LOGIN_FORM_LABELS.PASSWORD}
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
          <label htmlFor="captcha" className="form-label">
            {LOGIN_FORM_LABELS.CAPTCHA}
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

        <div className="remember-me-container">
          <div className="remember-me-group">
            <input
              type="checkbox"
              id="rememberMe"
              checked={form.rememberMe}
              onChange={handleInputChange('rememberMe')}
              className="remember-me-checkbox"
            />
            <label htmlFor="rememberMe" className="remember-me-label">
              {LOGIN_FORM_LABELS.REMEMBER_ME}
            </label>
          </div>
          <button
            type="button"
            className="forgot-password-button"
            onClick={handleForgotPassword}
          >
            {LOGIN_FORM_LABELS.FORGOT_PASSWORD}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? LOGIN_FORM_LABELS.LOADING : LOGIN_FORM_LABELS.SUBMIT}
        </button>
      </form>
    </div>
  );
}; 