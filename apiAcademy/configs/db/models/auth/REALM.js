module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('REALM', {
    ID: {
      type: Sequelize.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    ACCESS_CODE_LIFESPAN: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    USER_ACTION_LIFESPAN: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    ACCESS_TOKEN_LIFESPAN: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    ACCOUNT_THEME: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    ADMIN_THEME: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    EMAIL_THEME: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    ENABLED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    EVENTS_ENABLED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    EVENTS_EXPIRATION: {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    LOGIN_THEME: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    NAME: {
      type: Sequelize.STRING(255),
      allowNull: true,
      unique: "UK_ORVSDMLA56612EAEFIQ6WL5OI"
    },
    NOT_BEFORE: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    PASSWORD_POLICY: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    REGISTRATION_ALLOWED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    REMEMBER_ME: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    RESET_PASSWORD_ALLOWED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    SOCIAL: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    SSL_REQUIRED: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    SSO_IDLE_TIMEOUT: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    SSO_MAX_LIFESPAN: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    UPDATE_PROFILE_ON_SOC_LOGIN: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    VERIFY_EMAIL: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    MASTER_ADMIN_CLIENT: {
      type: Sequelize.STRING(36),
      allowNull: true
    },
    LOGIN_LIFESPAN: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    INTERNATIONALIZATION_ENABLED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    DEFAULT_LOCALE: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    REG_EMAIL_AS_USERNAME: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ADMIN_EVENTS_ENABLED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ADMIN_EVENTS_DETAILS_ENABLED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    EDIT_USERNAME_ALLOWED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    OTP_POLICY_COUNTER: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    OTP_POLICY_WINDOW: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    OTP_POLICY_PERIOD: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 30
    },
    OTP_POLICY_DIGITS: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 6
    },
    OTP_POLICY_ALG: {
      type: Sequelize.STRING(36),
      allowNull: true,
      defaultValue: "HmacSHA1"
    },
    OTP_POLICY_TYPE: {
      type: Sequelize.STRING(36),
      allowNull: true,
      defaultValue: "totp"
    },
    BROWSER_FLOW: {
      type: Sequelize.STRING(36),
      allowNull: true
    },
    REGISTRATION_FLOW: {
      type: Sequelize.STRING(36),
      allowNull: true
    },
    DIRECT_GRANT_FLOW: {
      type: Sequelize.STRING(36),
      allowNull: true
    },
    RESET_CREDENTIALS_FLOW: {
      type: Sequelize.STRING(36),
      allowNull: true
    },
    CLIENT_AUTH_FLOW: {
      type: Sequelize.STRING(36),
      allowNull: true
    },
    OFFLINE_SESSION_IDLE_TIMEOUT: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    REVOKE_REFRESH_TOKEN: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ACCESS_TOKEN_LIFE_IMPLICIT: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    LOGIN_WITH_EMAIL_ALLOWED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    DUPLICATE_EMAILS_ALLOWED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    DOCKER_AUTH_FLOW: {
      type: Sequelize.STRING(36),
      allowNull: true
    },
    REFRESH_TOKEN_MAX_REUSE: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    ALLOW_USER_MANAGED_ACCESS: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    SSO_MAX_LIFESPAN_REMEMBER_ME: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    SSO_IDLE_TIMEOUT_REMEMBER_ME: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    DEFAULT_ROLE: {
      type: Sequelize.STRING(255),
      allowNull: true
    }
  }, {
    dbInstance,
    tableName: 'REALM',
    timestamps: false,
    dbName: 'intranet_auth',
    schema: 'intranet_auth',
  });
};
