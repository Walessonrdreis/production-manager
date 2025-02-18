const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class UserController {
  constructor() {
    // Vinculando os métodos ao contexto da classe
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.update = this.update.bind(this);
    this.hashPassword = this.hashPassword.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
  }

  // Função auxiliar para criar hash da senha
  hashPassword(password) {
    try {
      console.log('Tipo da senha recebida:', typeof password);
      console.log('Valor da senha recebida:', password);
      
      if (!password || typeof password !== 'string') {
        throw new Error('Senha inválida: deve ser uma string não vazia');
      }

      const passwordString = String(password).trim();
      if (passwordString.length === 0) {
        throw new Error('Senha inválida: string vazia após trim');
      }

      return crypto.createHash('sha256').update(passwordString).digest('hex');
    } catch (error) {
      console.error('Erro ao criar hash da senha:', error);
      throw new Error(`Erro ao processar senha: ${error.message}`);
    }
  }

  // Função auxiliar para verificar senha
  verifyPassword(password, hashedPassword) {
    try {
      const hash = this.hashPassword(password);
      return hash === hashedPassword;
    } catch (error) {
      console.error('Erro ao verificar senha:', error);
      return false;
    }
  }

  // Criar um novo usuário
  async create(req, res) {
    try {
      console.log('Recebendo requisição de criação de usuário:', {
        ...req.body,
        password: req.body.password ? '[PRESENTE]' : '[AUSENTE]'
      });
      const { name, email, password, role } = req.body;

      // Validações básicas
      if (!password || typeof password !== 'string' || password.trim() === '') {
        console.log('Senha inválida recebida');
        return res.status(400).json({ error: 'Senha inválida' });
      }

      if (!email || typeof email !== 'string' || email.trim() === '') {
        console.log('Email inválido recebido');
        return res.status(400).json({ error: 'Email inválido' });
      }

      if (!name || typeof name !== 'string' || name.trim() === '') {
        console.log('Nome inválido recebido');
        return res.status(400).json({ error: 'Nome inválido' });
      }

      console.log('Tentando criar usuário:', { name, email, role });

      // Verificar se o usuário já existe
      const userExists = await User.findOne({ 
        where: { email: email.toLowerCase().trim() } 
      });
      
      if (userExists) {
        console.log('Usuário já existe com este email:', email);
        return res.status(400).json({ error: 'Usuário já existe com este e-mail.' });
      }

      // Criar hash da senha
      console.log('Criando hash da senha...');
      const hashedPassword = this.hashPassword(password.trim());
      console.log('Hash criado com sucesso');

      // Criar o usuário
      console.log('Criando usuário no banco...');
      const userData = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: role || 'user',
        active: true
      };
      console.log('Dados do usuário a ser criado:', { ...userData, password: '[REDACTED]' });

      const user = await User.create(userData);
      console.log('Usuário criado com sucesso. ID:', user.id);

      // Remover a senha do objeto de resposta
      const userResponse = user.toJSON();
      delete userResponse.password;

      return res.status(201).json(userResponse);
    } catch (error) {
      console.error('Erro detalhado ao criar usuário:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      if (error.name === 'SequelizeValidationError') {
        const details = error.errors.map(err => ({
          field: err.path,
          message: err.message,
          value: err.value
        }));
        console.error('Erro de validação:', details);
        return res.status(400).json({ 
          error: 'Dados inválidos',
          details
        });
      }

      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ 
          error: 'E-mail já está em uso'
        });
      }

      return res.status(500).json({ 
        error: 'Erro interno ao criar usuário',
        message: error.message
      });
    }
  }

  // Listar todos os usuários
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar usuários: ' + error.message });
    }
  }

  // Buscar um usuário específico
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuário: ' + error.message });
    }
  }

  // Atualizar um usuário
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, role, active } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // Se estiver atualizando o email, verificar se já existe
      if (email && email !== user.email) {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
          return res.status(400).json({ error: 'E-mail já está em uso.' });
        }
      }

      // Atualizar os campos
      const updateData = {
        name: name || user.name,
        email: email || user.email,
        role: role || user.role,
        active: active !== undefined ? active : user.active
      };

      // Se houver nova senha, criptografar
      if (password) {
        updateData.password = this.hashPassword(password);
      }

      await user.update(updateData);

      // Buscar usuário atualizado sem a senha
      const updatedUser = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      });

      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário: ' + error.message });
    }
  }

  // Deletar um usuário
  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      await user.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar usuário: ' + error.message });
    }
  }

  // Autenticar usuário
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Buscar usuário
      const user = await User.findOne({ where: { email: email.toLowerCase() } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      // Verificar senha
      const passwordMatch = this.verifyPassword(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      // Verificar se usuário está ativo
      if (!user.active) {
        return res.status(401).json({ error: 'Usuário está inativo.' });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { 
          id: user.id,
          email: user.email,
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Remover senha do objeto de resposta
      const userResponse = user.toJSON();
      delete userResponse.password;

      return res.json({
        user: userResponse,
        token
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.status(500).json({ error: 'Erro ao realizar login.' });
    }
  }
}

module.exports = new UserController(); 