var DataTypes = require("sequelize").DataTypes; 
let _USER_ENTITY = require('../auth/USER_ENTITY');

var _activity = require("./activity");
var _assessment = require("./assessment");
var _class_ = require("./class");
var _company = require("./company");
var _grade = require("./grade");
var _impression = require("./impression");
var _level = require("./level");
var _period = require("./period");
var _section = require("./section");
var _student_ma_tutor = require("./student_ma_tutor");

function initModels(sequelize) {
  var USER_ENTITY = _USER_ENTITY(sequelize, DataTypes);
  var activity = _activity(sequelize, DataTypes);
  var assessment = _assessment(sequelize, DataTypes);
  var class_ = _class_(sequelize, DataTypes);
  var company = _company(sequelize, DataTypes);
  var grade = _grade(sequelize, DataTypes);
  var impression = _impression(sequelize, DataTypes);
  var level = _level(sequelize, DataTypes);
  var period = _period(sequelize, DataTypes);
  var section = _section(sequelize, DataTypes);
  var student_ma_tutor = _student_ma_tutor(sequelize, DataTypes);

  grade.belongsTo(USER_ENTITY, { as: "student", foreignKey: "student_id"});
  USER_ENTITY.hasMany(grade, { as: "grades", foreignKey: "student_id"});
  impression.belongsTo(USER_ENTITY, { as: "student", foreignKey: "student_id"});
  USER_ENTITY.hasMany(impression, { as: "impressions", foreignKey: "student_id"});
  student_ma_tutor.belongsTo(USER_ENTITY, { as: "student", foreignKey: "student_id"});
  USER_ENTITY.hasMany(student_ma_tutor, { as: "student_ma_tutors", foreignKey: "student_id"});
  student_ma_tutor.belongsTo(USER_ENTITY, { as: "tutor", foreignKey: "tutor_id"});
  USER_ENTITY.hasMany(student_ma_tutor, { as: "tutor_student_ma_tutors", foreignKey: "tutor_id"});
  student_ma_tutor.belongsTo(USER_ENTITY, { as: "ma", foreignKey: "ma_id"});
  USER_ENTITY.hasMany(student_ma_tutor, { as: "ma_student_ma_tutors", foreignKey: "ma_id"});
  impression.belongsTo(activity, { as: "activity", foreignKey: "activity_id"});
  activity.hasMany(impression, { as: "impressions", foreignKey: "activity_id"});
  grade.belongsTo(assessment, { as: "assessment", foreignKey: "assessment_id"});
  assessment.hasMany(grade, { as: "grades", foreignKey: "assessment_id"});
  USER_ENTITY.belongsTo(class_, { as: "class", foreignKey: "class_id"});
  class_.hasMany(USER_ENTITY, { as: "USER_ENTITies", foreignKey: "class_id"});
  USER_ENTITY.belongsTo(company, { as: "company", foreignKey: "company_id"});
  company.hasMany(USER_ENTITY, { as: "USER_ENTITies", foreignKey: "company_id"});
  impression.belongsTo(level, { as: "level", foreignKey: "level_id"});
  level.hasMany(impression, { as: "impressions", foreignKey: "level_id"});
  grade.belongsTo(period, { as: "period", foreignKey: "period_id"});
  period.hasMany(grade, { as: "grades", foreignKey: "period_id"});
  impression.belongsTo(period, { as: "period", foreignKey: "period_id"});
  period.hasMany(impression, { as: "impressions", foreignKey: "period_id"});
  activity.belongsTo(section, { as: "section", foreignKey: "section_id"});
  section.hasMany(activity, { as: "activities", foreignKey: "section_id"});
  grade.belongsTo(section, { as: "section", foreignKey: "section_id"});
  section.hasMany(grade, { as: "grades", foreignKey: "section_id"});

  return {
    USER_ENTITY,
    activity,
    assessment,
    class_,
    company,
    grade,
    impression,
    level,
    period,
    section,
    student_ma_tutor,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
