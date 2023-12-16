module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('period', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false
    }
  }, {
    dbInstance,
    tableName: 'period',
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
