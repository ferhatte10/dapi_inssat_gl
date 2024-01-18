const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('REALM', {
    ID: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    ACCESS_CODE_LIFESPAN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    USER_ACTION_LIFESPAN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ACCESS_TOKEN_LIFESPAN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ACCOUNT_THEME: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ADMIN_THEME: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    EMAIL_THEME: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ENABLED: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    EVENTS_ENABLED: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    EVENTS_EXPIRATION: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    LOGIN_THEME: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    NAME: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "UK_ORVSDMLA56612EAEFIQ6WL5OI"
    },
    NOT_BEFORE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PASSWORD_POLICY: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    REGISTRATION_ALLOWED: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    REMEMBER_ME: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    RESET_PASSWORD_ALLOWED: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    SOCIAL: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    SSL_REQUIRED: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    SSO_IDLE_TIMEOUT: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SSO_MAX_LIFESPAN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    UPDATE_PROFILE_ON_SOC_LOGIN: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    VERIFY_EMAIL: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    MASTER_ADMIN_CLIENT: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    LOGIN_LIFESPAN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    INTERNATIONALIZATION_ENABLED: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    DEFAULT_LOCALE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    REG_EMAIL_AS_USERNAME: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ADMIN_EVENTS_ENABLED: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ADMIN_EVENTS_DETAILS_ENABLED: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    EDIT_USERNAME_ALLOWED: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    OTP_POLICY_COUNTER: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    OTP_POLICY_WINDOW: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    OTP_POLICY_PERIOD: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 30
    },
    OTP_POLICY_DIGITS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 6
    },
    OTP_POLICY_ALG: {
      type: DataTypes.STRING(36),
      allowNull: true,
      defaultValue: "HmacSHA1"
    },
    OTP_POLICY_TYPE: {
      type: DataTypes.STRING(36),
      allowNull: true,
      defaultValue: "totp"
    },
    BROWSER_FLOW: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    REGISTRATION_FLOW: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    DIRECT_GRANT_FLOW: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    RESET_CREDENTIALS_FLOW: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    CLIENT_AUTH_FLOW: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    OFFLINE_SESSION_IDLE_TIMEOUT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    REVOKE_REFRESH_TOKEN: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ACCESS_TOKEN_LIFE_IMPLICIT: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    LOGIN_WITH_EMAIL_ALLOWED: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    DUPLICATE_EMAILS_ALLOWED: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    DOCKER_AUTH_FLOW: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    REFRESH_TOKEN_MAX_REUSE: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    ALLOW_USER_MANAGED_ACCESS: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    SSO_MAX_LIFESPAN_REMEMBER_ME: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SSO_IDLE_TIMEOUT_REMEMBER_ME: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DEFAULT_ROLE: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'REALM',
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
        name: "UK_ORVSDMLA56612EAEFIQ6WL5OI",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NAME" },
        ]
      },
      {
        name: "IDX_REALM_MASTER_ADM_CLI",
        using: "BTREE",
        fields: [
          { name: "MASTER_ADMIN_CLIENT" },
        ]
      },
    ]
  });
};
