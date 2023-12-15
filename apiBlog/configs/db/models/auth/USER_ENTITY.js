module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('USER_ENTITY', {
    ID: {
      type: Sequelize.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    EMAIL: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    EMAIL_CONSTRAINT: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    EMAIL_VERIFIED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ENABLED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    FEDERATION_LINK: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    FIRST_NAME: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    LAST_NAME: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    REALM_ID: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    USERNAME: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    CREATED_TIMESTAMP: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    SERVICE_ACCOUNT_CLIENT_LINK: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    NOT_BEFORE: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    dbInstance,
    dbName: 'intranet_auth',
    tableName: 'USER_ENTITY',
    timestamps: false,
    schema: 'intranet_auth',
  });
};
