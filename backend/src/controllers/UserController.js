const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class UserController {
  // Criar um novo usuário
  async create(req, res) {
    try {
      const { name, email, password, role } = req.body;

      // Verificar se o usuário já existe
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe com este e-mail.' });
      }

      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar o usuário
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
      });

      // Remover a senha do objeto de resposta
      const userResponse = user.toJSON();
      delete userResponse.password;

      return res.status(201).json(userResponse);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário: ' + error.message });
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
        updateData.password = await bcrypt.hash(password, 10);
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
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      // Verificar senha
      const passwordMatch = await bcrypt.compare(password, user.password);
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
      return res.status(500).json({ error: 'Erro ao realizar login: ' + error.message });
    }
  }
}

module.exports = new UserController(); 