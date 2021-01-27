'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductRawMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductRawMaterial.belongsTo(models.Product, {foreignKey: 'ProductId'}),
      ProductRawMaterial.belongsTo(models.RawMaterial, {foreignKey: 'RawMaterialId'})
    }
  };
  ProductRawMaterial.init({
    ProductId: DataTypes.INTEGER,
    RawMaterialId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductRawMaterial',
  });
  return ProductRawMaterial;
};