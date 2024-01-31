const {max} = require("pg/lib/defaults");
module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('section', {
    id: {
      autoIncrement: true, 
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING(150),
      unique: true, 
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
