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
    name: DataTypes.STRING,
    availability: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RawMaterial',
  });
  return RawMaterial;
};