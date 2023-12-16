module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('activity', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    position: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    is_delete: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    is_free: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    section_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'section',
        key: 'id'
      }
    }
  }, {
    dbInstance,
    tableName: 'activity',
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
        name: "activity_section",
        using: "BTREE",
        fields: [
          { name: "section_id" },
        ]
      },
    ]
  });
};
