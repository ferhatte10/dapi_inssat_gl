module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('impression', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: Sequelize.STRING(250),
      allowNull: true
    },
    level_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: 'unique_impression',
      references: {
        model: 'level',
        key: 'id'
      }
    },
    activity_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: 'unique_impression',
      references: {
        model: 'activity',
        key: 'id'
      }
    },
    period_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: 'unique_impression',
      references: {
        model: 'period',
        key: 'id'
      }
    },
    student_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      unique: 'unique_impression',
      // references: {
      //   model: 'USER_ENTITY', 
      //   key: 'ID'
      // }
    }
  }, { 
    dbInstance,
    tableName: 'impression',
    timestamps: true,
    uniqueKeys: {
      unique_impression: {
        fields: ['level_id', 'activity_id', 'period_id', 'student_id']
      }
    },
    indexes: [ 
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [ 
          { name: "id" },
        ]
      },
      // {
      //   name: "impression_USER_ENTITY",
      //   using: "BTREE",
      //   fields: [
      //     { name: "student_id" },
      //   ]
      // },
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
