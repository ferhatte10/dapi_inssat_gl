module.exports = (dbInstance, Sequelize) => {


  return dbInstance.define('user', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    key_cloak_user_Id: {
      type: Sequelize.STRING(50),
      allowNull: false,
      comment: "Même ID que celui généré au niveau de Keycloak."
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    profession: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    visible_email: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    dbInstance,
    tableName: 'user',
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
    ]
  });
};
