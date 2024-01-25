

const {USER_ENTITY : UserModel} = require('../configs/db/config/db');

// Define the controller methods
const UserController = {};

// Get all users
UserController.getAll = async (req, res) => {
  try {

    let users = await UserModel.findAll({
      attributes: ["ID","FIRST_NAME","LAST_NAME","EMAIL"],
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
  let id = parseInt(req.params.id);
  try {
    //const user = await UserModel.findByPk(id);
    // get the user with given id in the intranet realm users
    let user = await UserModel.findOne({
      attributes: ["ID","FIRST_NAME","LAST_NAME","EMAIL"],
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
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = UserController;
