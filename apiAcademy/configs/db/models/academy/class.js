module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('class_', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true,//TODO: change vertabello
    },
    apprenticeship: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  }, {
    dbInstance,
    tableName: 'class',
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
