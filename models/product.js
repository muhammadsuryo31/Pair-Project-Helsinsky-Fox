'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Operator, {foreignKey: "OperatorId"}),
      Product.belongsToMany(models.RawMaterial,{through: models.ProductRawMaterial}),
      Product.hasMany(models.ProductRawMaterial, {foreignKey: "ProductId"})
    }
  };
  Product.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    OperatorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};