const {USER_ENTITY : UserModel} = require('../configs/db/config/db'); 

// Define the controller methods
const UserController = {};

// Get all users
UserController.getAll = async (req, res) => {
  try {

    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Internal server error' })
  }
};

// Get user by ID
UserController.getByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = UserController;
