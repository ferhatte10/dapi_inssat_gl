const UserModel = require('../configs/db/config/db').user; 

// Define the controller methods
const UserController = {};

// Get all users
UserController.getAll = async (req, res) => {
  try {

    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
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

// Delete user by ID
UserController.deleteByPk = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await UserModel.destroy({
      where: { id: id },
    });

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new user
UserController.create = async (req, res) => {
  const newUser = req.body;

  try {
    const createdUser = await UserModel.create(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user by ID
UserController.update = async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await UserModel.update(updatedData, {
      where: { id: id },
    });

    // Fetch the updated user data
    const updatedUser = await UserModel.findByPk(id);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = UserController;
