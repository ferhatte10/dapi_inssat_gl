module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('level', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: false
    }
  }, {
    dbInstance,
    tableName: 'level',
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
