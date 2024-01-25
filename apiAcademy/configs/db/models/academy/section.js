module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('section', {
    id: {
      autoIncrement: true, // TODO: edit in vertabelo and same for other models
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING(150),
      unique: true, // TODO: edit in vertabelo
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(400),
      allowNull: true
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
