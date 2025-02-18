import { IAuthService, ILoginForm, IRegisterForm } from '../interfaces/auth';

export class AuthService implements IAuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(data: ILoginForm): Promise<void> {
    // TODO: Implementar chamada à API de login
    console.log('Login:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.email !== 'admin@example.com' || data.password !== 'admin') {
      throw new Error('Credenciais inválidas');
    }
  }

  async register(data: IRegisterForm): Promise<void> {
    // TODO: Implementar chamada à API de registro
    console.log('Registro:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.email === 'admin@example.com') {
      throw new Error('Email já cadastrado');
    }
  }

  async forgotPassword(email: string): Promise<void> {
    // TODO: Implementar chamada à API de recuperação de senha
    console.log('Recuperar senha:', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
} 