const {USER_ENTITY : UserModel} = require('../configs/db/config/db');

// Define the controller methods
const UserController = {};

// Get all users
UserController.getAll = async (req, res) => {
  try {

    let users = await UserModel.findAll({
      attributes: ["ID","USERNAME","FIRST_NAME","LAST_NAME","EMAIL"],
      include: [
        {
          association: 'realm',
          where: { name: 'intranet' },
          attributes: []
        },
        {
          association: 'USER_ATTRIBUTES',
          attributes: ['name', 'value']
        }
      ]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get user by ID

UserController.getByPk = async (req, res) => {
  let id = req.params.id;
  try {
    //const user = await UserModel.findByPk(id);
    // get the user with given id in the intranet realm users
    let user = await UserModel.findOne({
      attributes: ["ID","USERNAME","FIRST_NAME","LAST_NAME","EMAIL"],
      where: { id: id },
      include: [
        {
          association: 'realm',
          where: { name: 'intranet' },
          attributes: []
        },
        {
          association: 'USER_ATTRIBUTES',
          attributes: ['name', 'value']
        }
      ]
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

// student_ma_tutor.belongsTo(USER_ENTITY, { as: "student", foreignKey: "student_id"});
// USER_ENTITY.hasMany(student_ma_tutor, { as: "student_ma_tutors", foreignKey: "student_id"});
// student_ma_tutor.belongsTo(USER_ENTITY, { as: "tutor", foreignKey: "tutor_id"});
// USER_ENTITY.hasMany(student_ma_tutor, { as: "tutor_student_ma_tutors", foreignKey: "tutor_id"});
// student_ma_tutor.belongsTo(USER_ENTITY, { as: "ma", foreignKey: "ma_id"});
// USER_ENTITY.hasMany(student_ma_tutor, { as: "ma_student_ma_tutors", foreignKey: "ma_id"});
//
// user_class.belongsTo(USER_ENTITY, { as: "user", foreignKey: "user_id"});
// USER_ENTITY.hasMany(user_class, { as: "user_classes", foreignKey: "user_id"});
// user_company.belongsTo(USER_ENTITY, { as: "user", foreignKey: "user_id"});
// USER_ENTITY.hasMany(user_company, { as: "user_companies", foreignKey: "user_id"});
// user_class.belongsTo(class_, { as: "class", foreignKey: "class_id"});
// class_.hasMany(user_class, { as: "user_classes", foreignKey: "class_id"});
// user_company.belongsTo(company, { as: "company", foreignKey: "company_id"});
// company.hasMany(user_company, { as: "user_companies", foreignKey: "company_id"});
UserController.getSuivi = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await UserModel.findOne({
      attributes: ["ID","USERNAME","FIRST_NAME","LAST_NAME","EMAIL"],
      where: { id: id },
      include: [
        {
          association: 'realm',
          where: { name: 'intranet' },
          attributes: []
        },
        {
          association: 'USER_ATTRIBUTES',
          attributes: ['name', 'value']
        },
        {
            association: 'user_classes',
            attributes: ["id"],
            include: [
                {
                  association: 'class',
                }
            ]
        },
        {
            association: 'user_companies',
            attributes: ["id"],
            include: [
                {
                    association: 'company',
                }
            ]
        },
        {
            association: 'student_ma_tutors',
            attributes: ["id"],
            include: [
                {
                    association: 'tutor',
                    attributes: ["ID","USERNAME","FIRST_NAME","LAST_NAME","EMAIL"],
                    include: [
                        {
                            association: 'USER_ATTRIBUTES',
                            attributes: ['name', 'value']
                        }
                    ]
                },
                {
                  association: 'ma',
                  attributes: ["ID","USERNAME","FIRST_NAME","LAST_NAME","EMAIL"],
                  include: [
                    {
                      association: 'USER_ATTRIBUTES',
                      attributes: ['name', 'value']
                    }
                  ]
                }
            ]
        },

      ]
    });
    // i want
    let reconstructedUser = {
      ID: user.ID,
      USERNAME: user.USERNAME,
      FIRST_NAME: user.FIRST_NAME,
      LAST_NAME: user.LAST_NAME,
      EMAIL: user.EMAIL,
      CLASS: user.user_classes.map(user_class => user_class.class),
      COMPANY: user.user_companies.map(user_company => user_company.company),
      MA: user.student_ma_tutors.map(student_ma_tutor =>student_ma_tutor.ma),
      TUTOR: user.student_ma_tutors.map(student_ma_tutor => student_ma_tutor.tutor),
    };
    res.json(reconstructedUser);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = UserController;
