'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RawMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RawMaterial.belongsToMany(models.Product,{through: models.ProductRawMaterial}),
      RawMaterial.hasMany(models.ProductRawMaterial, {foreignKey: "RawMaterialId"})
    }
  };
  RawMaterial.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "nama raw material tidak boleh kosong"}
      }
    },
    availability: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: " Jumlah pembelian tidak boleh kosong"},
        min: {
          args: 1,
          msg: "pembelian minimal 1 buah dan tidak boleh minus"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'RawMaterial',
  });
  return RawMaterial;
};