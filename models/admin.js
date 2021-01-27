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
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  Admin.addHook('beforeCreate', (data,options) => {
    data.password = hash(data.password)
  });
  return Admin;
};