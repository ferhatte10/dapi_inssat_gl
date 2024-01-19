const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_class', {
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
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'class',
      //   key: 'id'
      // }
    }
  }, {
    sequelize,
    tableName: 'user_class',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Copy_of_user_company_USER_ENTITY",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "Copy_of_user_company_class",
        using: "BTREE",
        fields: [
          { name: "class_id" },
        ]
      },
    ]
  });
};
