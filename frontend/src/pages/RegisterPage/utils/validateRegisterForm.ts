import { IRegisterForm, IAuthError } from '../../../interfaces/auth';
import { REGISTER_MESSAGES } from '../constants';

export const validateRegisterForm = (form: IRegisterForm): IAuthError[] => {
  const errors: IAuthError[] = [];

  // Validar senha
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(form.password)) {
    errors.push({
      field: 'password',
      message: REGISTER_MESSAGES.ERROR.PASSWORD_TOO_WEAK,
    });
  }

  // Validar confirmação de senha
  if (form.password !== form.confirmPassword) {
    errors.push({
      field: 'confirmPassword',
      message: REGISTER_MESSAGES.ERROR.PASSWORDS_DONT_MATCH,
    });
  }

  // Validar CAPTCHA
  if (!form.captcha) {
    errors.push({
      field: 'captcha',
      message: REGISTER_MESSAGES.ERROR.CAPTCHA_REQUIRED,
    });
  }

  // Validar termos de uso
  if (!form.acceptTerms) {
    errors.push({
      field: 'acceptTerms',
      message: REGISTER_MESSAGES.ERROR.TERMS_REQUIRED,
    });
  }

  return errors;
}; 