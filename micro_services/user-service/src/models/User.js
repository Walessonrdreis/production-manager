const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

class User extends Model {
  /**
   * Verifica se a senha fornecida corresponde à senha do usuário
   * @param {string} password - Senha a ser verificada
   * @returns {Promise<boolean>} True se a senha estiver correta
   */
  async checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'O nome é obrigatório' },
        len: {
          args: [3, 100],
          msg: 'O nome deve ter entre 3 e 100 caracteres',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Este email já está em uso',
      },
      validate: {
        notEmpty: { msg: 'O email é obrigatório' },
        isEmail: { msg: 'Email inválido' },
      },
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'A senha é obrigatória' },
        len: {
          args: [6, 100],
          msg: 'A senha deve ter entre 6 e 100 caracteres',
        },
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    last_login: {
      type: DataTypes.DATE,
    },
    password_reset_token: {
      type: DataTypes.STRING,
    },
    password_reset_expires: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      beforeSave: async (user) => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

module.exports = User; 