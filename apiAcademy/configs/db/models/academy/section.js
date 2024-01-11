module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('section', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(120),
      allowNull: false
    }
  }, {
    dbInstance,
    tableName: 'section',
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
