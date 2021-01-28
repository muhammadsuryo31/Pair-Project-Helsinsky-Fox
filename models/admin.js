'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require("../helpers/hasher");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Admin.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "nama tidak boleh kosong"}
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "username tidak boleh kosong"}
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
          isEmail: {msg: "email tidak boleh kosong dan harus berformat email"}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "nama tidak boleh kosong"}
      }
    },
  }, {
    sequelize,
    modelName: 'Admin',
  });
  Admin.addHook('beforeCreate', (data,options) => {
    data.password = hash(data.password)
  });
  return Admin;
};