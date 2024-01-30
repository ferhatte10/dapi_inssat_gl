module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('company', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    address: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    city: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
  }, {
    dbInstance,
    tableName: 'company',
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
      {
        name: 'activity_pos_section_unique',
        type: 'unique',
        fields: ['name', 'address',"city"]
      }
    ]
  });
};
