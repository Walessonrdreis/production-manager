/**
 * Interface que define os métodos de acesso a dados para usuários
 * @interface
 */
class IUserRepository {
  /**
   * Cria um novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Promise<Object>} Usuário criado
   */
  async create(userData) {
    throw new Error('Método create não implementado');
  }

  /**
   * Busca um usuário pelo ID
   * @param {string} id - ID do usuário
   * @returns {Promise<Object>} Usuário encontrado
   */
  async findById(id) {
    throw new Error('Método findById não implementado');
  }

  /**
   * Busca um usuário pelo email
   * @param {string} email - Email do usuário
   * @returns {Promise<Object>} Usuário encontrado
   */
  async findByEmail(email) {
    throw new Error('Método findByEmail não implementado');
  }

  /**
   * Lista todos os usuários com paginação
   * @param {number} page - Número da página
   * @param {number} limit - Limite de registros por página
   * @returns {Promise<Object>} Lista de usuários e metadados da paginação
   */
  async findAll(page, limit) {
    throw new Error('Método findAll não implementado');
  }

  /**
   * Atualiza um usuário
   * @param {string} id - ID do usuário
   * @param {Object} userData - Novos dados do usuário
   * @returns {Promise<Object>} Usuário atualizado
   */
  async update(id, userData) {
    throw new Error('Método update não implementado');
  }

  /**
   * Remove um usuário
   * @param {string} id - ID do usuário
   * @returns {Promise<boolean>} True se removido com sucesso
   */
  async delete(id) {
    throw new Error('Método delete não implementado');
  }
} 