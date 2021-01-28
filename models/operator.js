'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Operator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Operator.hasMany(models.Product, {foreignKey: "OperatorId"})
    }
  };
  Operator.init({
    name:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "nama tidak boleh kosong"}
      }
    },
    email:{
      type: DataTypes.STRING,
      validate: {
          isEmail: {msg: "email tidak boleh kosong dan harus berformat email"}
      }
    },
  }, {
    sequelize,
    modelName: 'Operator',
  });
  return Operator;
};