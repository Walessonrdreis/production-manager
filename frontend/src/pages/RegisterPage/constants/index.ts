export const REGISTER_MESSAGES = {
  ERROR: {
    DEFAULT: 'Erro ao criar conta. Por favor, tente novamente.',
    EMAIL_EXISTS: 'Este email já está cadastrado.',
    PASSWORDS_DONT_MATCH: 'As senhas não conferem.',
    PASSWORD_TOO_WEAK: 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.',
    CAPTCHA_REQUIRED: 'Por favor, preencha o CAPTCHA.',
    TERMS_REQUIRED: 'Você precisa aceitar os termos de uso.',
  },
  SUCCESS: {
    REGISTER: 'Conta criada com sucesso! Por favor, faça login.',
  },
};

export const REGISTER_FORM_LABELS = {
  NAME: 'Nome completo',
  EMAIL: 'Endereço de Email',
  PASSWORD: 'Senha',
  CONFIRM_PASSWORD: 'Confirmar Senha',
  CAPTCHA: 'CAPTCHA',
  ACCEPT_TERMS: 'Li e aceito os termos de uso e política de privacidade',
  SUBMIT: 'Criar Conta',
  LOADING: 'Criando conta...',
  LOGIN: 'Já tem uma conta? Faça login',
}; 