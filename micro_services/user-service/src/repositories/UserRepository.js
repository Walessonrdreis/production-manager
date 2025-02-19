const User = require('../models/User');

class UserRepository {
  /**
   * Cria um novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Promise<Object>} Usuário criado
   */
  async create(userData) {
    return User.create(userData);
  }

  /**
   * Busca um usuário pelo ID
   * @param {string} id - ID do usuário
   * @returns {Promise<Object>} Usuário encontrado
   */
  async findById(id) {
    return User.findByPk(id, {
      attributes: { exclude: ['password_hash'] },
    });
  }

  /**
   * Busca um usuário pelo email
   * @param {string} email - Email do usuário
   * @returns {Promise<Object>} Usuário encontrado
   */
  async findByEmail(email) {
    return User.findOne({
      where: { email },
    });
  }

  /**
   * Lista todos os usuários com paginação
   * @param {number} page - Número da página
   * @param {number} limit - Limite de registros por página
   * @returns {Promise<Object>} Lista de usuários e metadados da paginação
   */
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({
      attributes: { exclude: ['password_hash'] },
      limit,
      offset,
      order: [['created_at', 'DESC']],
    });

    return {
      users: rows,
      pagination: {
        total: count,
        page,
        pages: Math.ceil(count / limit),
      },
    };
  }

  /**
   * Atualiza um usuário
   * @param {string} id - ID do usuário
   * @param {Object} userData - Novos dados do usuário
   * @returns {Promise<Object>} Usuário atualizado
   */
  async update(id, userData) {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.update(userData);
    return user;
  }

  /**
   * Remove um usuário
   * @param {string} id - ID do usuário
   * @returns {Promise<boolean>} True se removido com sucesso
   */
  async delete(id) {
    const deleted = await User.destroy({
      where: { id },
    });
    return deleted > 0;
  }

  /**
   * Atualiza o token de redefinição de senha
   * @param {string} id - ID do usuário
   * @param {string} token - Token de redefinição
   * @param {Date} expires - Data de expiração
   * @returns {Promise<Object>} Usuário atualizado
   */
  async updatePasswordReset(id, token, expires) {
    return User.update(
      {
        password_reset_token: token,
        password_reset_expires: expires,
      },
      { where: { id } }
    );
  }

  /**
   * Atualiza a data do último login
   * @param {string} id - ID do usuário
   * @returns {Promise<Object>} Usuário atualizado
   */
  async updateLastLogin(id) {
    return User.update(
      {
        last_login: new Date(),
      },
      { where: { id } }
    );
  }
}

module.exports = new UserRepository(); 