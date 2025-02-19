/**
 * Interface que define os métodos de serviço para usuários
 * @interface
 */
class IUserService {
  /**
   * Registra um novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Promise<Object>} Usuário registrado
   */
  async register(userData) {
    throw new Error('Método register não implementado');
  }

  /**
   * Autentica um usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<Object>} Token de autenticação e dados do usuário
   */
  async authenticate(email, password) {
    throw new Error('Método authenticate não implementado');
  }

  /**
   * Obtém um usuário pelo ID
   * @param {string} id - ID do usuário
   * @returns {Promise<Object>} Usuário encontrado
   */
  async getUser(id) {
    throw new Error('Método getUser não implementado');
  }

  /**
   * Lista usuários com paginação
   * @param {number} page - Número da página
   * @param {number} limit - Limite de registros por página
   * @returns {Promise<Object>} Lista de usuários e metadados da paginação
   */
  async listUsers(page, limit) {
    throw new Error('Método listUsers não implementado');
  }

  /**
   * Atualiza um usuário
   * @param {string} id - ID do usuário
   * @param {Object} userData - Novos dados do usuário
   * @returns {Promise<Object>} Usuário atualizado
   */
  async updateUser(id, userData) {
    throw new Error('Método updateUser não implementado');
  }

  /**
   * Remove um usuário
   * @param {string} id - ID do usuário
   * @returns {Promise<boolean>} True se removido com sucesso
   */
  async deleteUser(id) {
    throw new Error('Método deleteUser não implementado');
  }

  /**
   * Altera a senha do usuário
   * @param {string} id - ID do usuário
   * @param {string} currentPassword - Senha atual
   * @param {string} newPassword - Nova senha
   * @returns {Promise<boolean>} True se a senha foi alterada com sucesso
   */
  async changePassword(id, currentPassword, newPassword) {
    throw new Error('Método changePassword não implementado');
  }

  /**
   * Solicita redefinição de senha
   * @param {string} email - Email do usuário
   * @returns {Promise<boolean>} True se o email de redefinição foi enviado
   */
  async requestPasswordReset(email) {
    throw new Error('Método requestPasswordReset não implementado');
  }

  /**
   * Redefine a senha do usuário
   * @param {string} token - Token de redefinição
   * @param {string} newPassword - Nova senha
   * @returns {Promise<boolean>} True se a senha foi redefinida com sucesso
   */
  async resetPassword(token, newPassword) {
    throw new Error('Método resetPassword não implementado');
  }
} 