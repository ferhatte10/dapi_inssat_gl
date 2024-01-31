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
  });
};
