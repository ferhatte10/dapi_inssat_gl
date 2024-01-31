module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('student_ma_tutor', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    student_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      // references: {
      //   model: 'USER_ENTITY',
      //   key: 'ID'
      // }
    },
    tutor_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      // references: {
      //   model: 'USER_ENTITY',
      //   key: 'ID'
      // }
    },
    ma_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      // references: {
      //   model: 'USER_ENTITY',
      //   key: 'ID'
      // }
    }
  }, {
    dbInstance,
    tableName: 'student_ma_tutor',
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
        name: "student_ma_tutor_ma",
        using: "BTREE",
        fields: [
          { name: "ma_id" },
        ]
      },
      {
        name: "student_ma_tutor_student",
        using: "BTREE",
        fields: [
          { name: "tutor_id" },
        ]
      },
      {
        name: "student_ma_tutor_tutor",
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
    ]
  });
};
