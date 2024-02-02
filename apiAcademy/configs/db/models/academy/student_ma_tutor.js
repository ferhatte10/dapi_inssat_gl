module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('student_ma_tutor', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_id: {
      type: Sequelize.STRING(36),
      allowNull: false
    },
    tutor_id: {
      type: Sequelize.STRING(36),
      allowNull: false
    },
    ma_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
    }
  }, {
    dbInstance,
    tableName: 'student_ma_tutor',
    timestamps: true,
    indexes: [
      {
        name: 'unique_student_ma_tutor',
        type: 'unique',
        fields: ['student_id', 'tutor_id', 'ma_id']
      },
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
