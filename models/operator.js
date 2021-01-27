'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require("../helpers/hasher");
module.exports = (sequelize, DataTypes) => {
  class Operator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Operator.hasMany(models.Product)
    }
  };
  Operator.init({
    name: DataTypes.STRING,
    username:DataTypes.STRING,
    email:DataTypes.STRING,
    password:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Operator',
  });
  Operator.addHook('beforeCreate', (data,options) => {
    data.password = hash(data.password)
  });
  return Operator;
};