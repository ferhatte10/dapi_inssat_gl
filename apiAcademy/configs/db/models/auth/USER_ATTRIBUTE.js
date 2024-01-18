module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('USER_ATTRIBUTE', {
    NAME: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    VALUE: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    USER_ID: {
      type: Sequelize.STRING(36),
      allowNull: false,
      references: {
        model: 'USER_ENTITY',
        key: 'ID'
      }
    },
    ID: {
      type: Sequelize.STRING(36),
      allowNull: false,
      defaultValue: "sybase-needs-something-here",
      primaryKey: true
    }
  }, {
    dbInstance,
    tableName: 'USER_ATTRIBUTE',
    timestamps: false,
    dbName: 'intranet_auth',
    schema: 'intranet_auth',
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
