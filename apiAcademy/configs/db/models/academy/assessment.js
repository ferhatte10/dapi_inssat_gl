module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('assessment', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique: true
    },
    coefficient: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    position: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }, {
    dbInstance,
    tableName: 'assessment',
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
