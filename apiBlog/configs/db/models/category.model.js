module.exports = (dbInstance, Sequelize) => {


  return dbInstance.define('category', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    parent_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  }, {
    dbInstance,
    tableName: 'category',
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
