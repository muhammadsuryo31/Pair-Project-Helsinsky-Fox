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
    RawMaterialId:  {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: "Raw Material tidak boleh kosong"
        }
      }
    },
    amount:  {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: " amount tidak boleh kosong"},
        min: {
          args: 1,
          msg: "amount minimal 1 buah dan tidak boleh minus"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ProductRawMaterial',
  });
  return ProductRawMaterial;
};