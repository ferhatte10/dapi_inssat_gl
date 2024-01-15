module.exports = function(dbInstance, Sequelize) {
  return dbInstance.define('grade', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    student_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      // references: {
      //   model: 'USER_ENTITY',
      //   key: 'ID'
      // }
    },
    grade: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    assessment_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'assessment',
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
    comment: {
      type: Sequelize.STRING(120),
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
    tableName: 'grade',
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
        name: "grade_USER_ENTITY",
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
      {
        name: "grade_assessment",
        using: "BTREE",
        fields: [
          { name: "assessment_id" },
        ]
      },
      {
        name: "grade_period",
        using: "BTREE",
        fields: [
          { name: "period_id" },
        ]
      },
      {
        name: "grade_section",
        using: "BTREE",
        fields: [
          { name: "section_id" },
        ]
      },
    ]
  });
};
