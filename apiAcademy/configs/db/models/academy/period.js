module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('period', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(150),// TODO: change vertabelo
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(500), // TODO: change vertabello
      allowNull: false
    },
    number: {
      type: Sequelize.INTEGER, // TODO: change vertabello
      allowNull: false
    },
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
