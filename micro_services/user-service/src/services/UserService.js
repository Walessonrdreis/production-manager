const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userRepository = require('../repositories/UserRepository');

class UserService {
  constructor() {
    this.userRepository = userRepository;
  }

  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Promise<Object>} Usuário registrado
   */
  async register(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    const user = await this.userRepository.create(userData);
    const { password_hash, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  /**
   * Autentica um usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<Object>} Token de autenticação e dados do usuário
   */
  async authenticate(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      throw new Error('Senha inválida');
    }

    if (!user.active) {
      throw new Error('Usuário inativo');
    }

    await this.userRepository.updateLastLogin(user.id);

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    const { password_hash, ...userWithoutPassword } = user.toJSON();
    return { token, user: userWithoutPassword };
  }

  /**
   * Obtém um usuário pelo ID
   * @param {string} id - ID do usuário
   * @returns {Promise<Object>} Usuário encontrado
   */
  async getUser(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  /**
   * Lista usuários com paginação
   * @param {number} page - Número da página
   * @param {number} limit - Limite de registros por página
   * @returns {Promise<Object>} Lista de usuários e metadados da paginação
   */
  async listUsers(page, limit) {
    return this.userRepository.findAll(page, limit);
  }

  /**
   * Atualiza um usuário
   * @param {string} id - ID do usuário
   * @param {Object} userData - Novos dados do usuário
   * @returns {Promise<Object>} Usuário atualizado
   */
  async updateUser(id, userData) {
    const user = await this.userRepository.update(id, userData);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const { password_hash, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  /**
   * Remove um usuário
   * @param {string} id - ID do usuário
   * @returns {Promise<boolean>} True se removido com sucesso
   */
  async deleteUser(id) {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new Error('Usuário não encontrado');
    }
    return true;
  }

  /**
   * Altera a senha do usuário
   * @param {string} id - ID do usuário
   * @param {string} currentPassword - Senha atual
   * @param {string} newPassword - Nova senha
   * @returns {Promise<boolean>} True se a senha foi alterada com sucesso
   */
  async changePassword(id, currentPassword, newPassword) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isValidPassword = await user.checkPassword(currentPassword);
    if (!isValidPassword) {
      throw new Error('Senha atual inválida');
    }

    await this.userRepository.update(id, { password: newPassword });
    return true;
  }

  /**
   * Solicita redefinição de senha
   * @param {string} email - Email do usuário
   * @returns {Promise<boolean>} True se o email de redefinição foi enviado
   */
  async requestPasswordReset(email) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    await this.userRepository.updatePasswordReset(user.id, token, expires);

    // TODO: Implementar envio de email com token
    return true;
  }

  /**
   * Redefine a senha do usuário
   * @param {string} token - Token de redefinição
   * @param {string} newPassword - Nova senha
   * @returns {Promise<boolean>} True se a senha foi redefinida com sucesso
   */
  async resetPassword(token, newPassword) {
    const user = await this.userRepository.findOne({
      where: {
        password_reset_token: token,
        password_reset_expires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      throw new Error('Token inválido ou expirado');
    }

    await this.userRepository.update(user.id, {
      password: newPassword,
      password_reset_token: null,
      password_reset_expires: null,
    });

    return true;
  }
}

module.exports = new UserService(); 