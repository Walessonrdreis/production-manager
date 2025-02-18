export interface IAuthForm {
  email: string;
  password: string;
  captcha: string;
}

export interface ILoginForm extends IAuthForm {
  rememberMe: boolean;
}

export interface IRegisterForm extends IAuthForm {
  name: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface IAuthError {
  field?: string;
  message: string;
}

export interface IAuthService {
  login(data: ILoginForm): Promise<void>;
  register(data: IRegisterForm): Promise<void>;
  forgotPassword(email: string): Promise<void>;
}

export interface IFormValidation {
  validate(data: IAuthForm): IAuthError[];
} 