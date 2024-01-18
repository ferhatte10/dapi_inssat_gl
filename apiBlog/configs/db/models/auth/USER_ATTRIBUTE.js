const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USER_ATTRIBUTE', {
    NAME: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    VALUE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    USER_ID: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'USER_ENTITY',
        key: 'ID'
      }
    },
    ID: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: "sybase-needs-something-here",
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'USER_ATTRIBUTE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "IDX_USER_ATTRIBUTE",
        using: "BTREE",
        fields: [
          { name: "USER_ID" },
        ]
      },
      {
        name: "IDX_USER_ATTRIBUTE_NAME",
        using: "BTREE",
        fields: [
          { name: "NAME" },
          { name: "VALUE" },
        ]
      },
    ]
  });
};
