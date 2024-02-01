const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_company', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      // references: {
      //   model: 'USER_ENTITY',
      //   key: 'ID'
      // }
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'company',
      //   key: 'id'
      // }
    }
  }, {
    sequelize,
    tableName: 'user_company',
    timestamps: true,
    indexes: [
      {
        name: 'user_companies_unique',
        type: 'unique',
        fields: ['user_id', 'company_id']
      },
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_company_USER_ENTITY",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_company_company",
        using: "BTREE",
        fields: [
          { name: "company_id" },
        ]
      },
    ]
  });
};
