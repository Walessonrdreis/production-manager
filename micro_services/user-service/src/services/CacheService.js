const Redis = require('ioredis');
const logger = require('../utils/logger');

class CacheService {
  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    this.client.on('error', (error) => {
      logger.error('Erro na conexão com Redis:', error);
    });

    this.client.on('connect', () => {
      logger.info('Conectado ao Redis com sucesso');
    });
  }

  /**
   * Obtém um valor do cache
   * @param {string} key - Chave do cache
   * @returns {Promise<any>} Valor armazenado
   */
  async get(key) {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error(`Erro ao obter valor do cache para chave ${key}:`, error);
      return null;
    }
  }

  /**
   * Armazena um valor no cache
   * @param {string} key - Chave do cache
   * @param {any} value - Valor a ser armazenado
   * @param {number} ttl - Tempo de vida em segundos
   * @returns {Promise<boolean>} True se armazenado com sucesso
   */
  async set(key, value, ttl = 3600) {
    try {
      await this.client.set(key, JSON.stringify(value), 'EX', ttl);
      return true;
    } catch (error) {
      logger.error(`Erro ao armazenar valor no cache para chave ${key}:`, error);
      return false;
    }
  }

  /**
   * Remove um valor do cache
   * @param {string} key - Chave do cache
   * @returns {Promise<boolean>} True se removido com sucesso
   */
  async del(key) {
    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      logger.error(`Erro ao remover valor do cache para chave ${key}:`, error);
      return false;
    }
  }

  /**
   * Limpa todo o cache
   * @returns {Promise<boolean>} True se limpo com sucesso
   */
  async clear() {
    try {
      await this.client.flushall();
      return true;
    } catch (error) {
      logger.error('Erro ao limpar cache:', error);
      return false;
    }
  }

  /**
   * Obtém múltiplos valores do cache
   * @param {string[]} keys - Lista de chaves
   * @returns {Promise<any[]>} Lista de valores
   */
  async mget(keys) {
    try {
      const values = await this.client.mget(keys);
      return values.map((value) => (value ? JSON.parse(value) : null));
    } catch (error) {
      logger.error('Erro ao obter múltiplos valores do cache:', error);
      return keys.map(() => null);
    }
  }

  /**
   * Armazena múltiplos valores no cache
   * @param {Object} entries - Objeto com pares chave-valor
   * @param {number} ttl - Tempo de vida em segundos
   * @returns {Promise<boolean>} True se armazenado com sucesso
   */
  async mset(entries, ttl = 3600) {
    try {
      const pipeline = this.client.pipeline();
      Object.entries(entries).forEach(([key, value]) => {
        pipeline.set(key, JSON.stringify(value), 'EX', ttl);
      });
      await pipeline.exec();
      return true;
    } catch (error) {
      logger.error('Erro ao armazenar múltiplos valores no cache:', error);
      return false;
    }
  }
}

module.exports = new CacheService(); 