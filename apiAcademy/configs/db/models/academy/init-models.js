let DataTypes = require("sequelize").DataTypes; 
let _USER_ENTITY = require('../auth/USER_ENTITY');

let _user_attribute = require('../auth/USER_ATTRIBUTE');
let _realm = require('../auth/REALM');

let _activity = require("./activity");
let _assessment = require("./assessment");
let _class_ = require("./class");
let _company = require("./company");
let _grade = require("./grade");
let _impression = require("./impression");
let _level = require("./level");
let _period = require("./period");
let _section = require("./section");
let _student_ma_tutor = require("./student_ma_tutor");

function initModels(sequelize) {
  let USER_ENTITY = _USER_ENTITY(sequelize, DataTypes);
  let user_attribute = _user_attribute(sequelize, DataTypes);
  let realm = _realm(sequelize, DataTypes);
  let activity = _activity(sequelize, DataTypes);
  let assessment = _assessment(sequelize, DataTypes);
  let class_ = _class_(sequelize, DataTypes);
  let company = _company(sequelize, DataTypes);
  let grade = _grade(sequelize, DataTypes);
  let impression = _impression(sequelize, DataTypes);
  let level = _level(sequelize, DataTypes);
  let period = _period(sequelize, DataTypes);
  let section = _section(sequelize, DataTypes);
  let student_ma_tutor = _student_ma_tutor(sequelize, DataTypes);

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
  //USER_ENTITY.belongsTo(class_, { as: "class", foreignKey: "class_id"});
  // class_.hasMany(USER_ENTITY, { as: "user", foreignKey: "class_id"}); TODO : USER does not have class_id
  // USER_ENTITY.belongsTo(company, { as: "company", foreignKey: "company_id"}); // TODO : USER does not have company_id
  // company.hasMany(USER_ENTITY, { as: "user", foreignKey: "company_id"});
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

  user_attribute.belongsTo(USER_ENTITY, { as: "user", foreignKey: "ID"});
  USER_ENTITY.hasMany(user_attribute, { as: "user_attr", foreignKey: "USER_ID"});

  USER_ENTITY.belongsTo(realm, { as: "realm", foreignKey: "REALM_ID"});
  realm.hasMany(USER_ENTITY, { as: "user_entities", foreignKey: "REALM_ID"});

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
