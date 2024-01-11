module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('impression', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: Sequelize.STRING(250),
      allowNull: true
    },
    level_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'level',
        key: 'id'
      }
    },
    activity_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'activity',
        key: 'id'
      }
    },
    period_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'period',
        key: 'id'
      }
    },
    student_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      // references: {
      //   model: 'USER_ENTITY',
      //   key: 'ID'
      // }
    }
  }, {
    dbInstance,
    tableName: 'impression',
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
        name: "impression_USER_ENTITY",
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
      {
        name: "impression_activity",
        using: "BTREE",
        fields: [
          { name: "activity_id" },
        ]
      },
      {
        name: "impression_level",
        using: "BTREE",
        fields: [
          { name: "level_id" },
        ]
      },
      {
        name: "impression_period",
        using: "BTREE",
        fields: [
          { name: "period_id" },
        ]
      },
    ]
  });
};
