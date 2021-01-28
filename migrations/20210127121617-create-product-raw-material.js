'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductRawMaterials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER,
        reference: {
          model: "Products",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      RawMaterialId: {
        type: Sequelize.INTEGER,
        reference: {
          model: "RawMaterials",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      amount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductRawMaterials');
  }
};