const { user_class: UserClass, class_: Class } = require('../configs/db/config/db');

const getAllUserClasses = async (req, res) => {
  try {
    const userClasses = await UserClass.findAll();
    res.json(userClasses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllUserClassesWithDetails = async (req, res) => {
  try {
    const userClasses = await UserClass.findAll(
        {
          include: [
            {
              association: 'user',
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
            },
            {
              association: 'class'
            }
          ]
        }
    );
    res.json(userClasses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const userClass = await UserClass.findByPk(id);
    if (!userClass) {
      return res.status(404).json({ message: 'User Class not found' });
    }
    res.json(userClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getUserClassByIdWithDetails = async (req, res) => {
  const { id } = req.params;
  try {
    // const userClass = await UserClass.findByPk(id);
    const userClass = await UserClass.findOne({
        where: { id: id },
        include: [
            {
            association: 'user',
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
            },
            {
            association: 'class'
            }
        ]
    })
    if (!userClass) {
      return res.status(404).json({ message: 'User Class not found' });
    }
    res.json(userClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUserClass = async (req, res) => {
  const { user_id, class_id } = req.body;
  try {
    // Check if the class exists before creating user_class
    const existingClass = await Class.findByPk(class_id);
    if (!existingClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const newUserClass = await UserClass.create({ user_id, class_id });
    res.status(201).json(newUserClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserClass = async (req, res) => {
  const { id } = req.params;
  const { user_id, class_id } = req.body;
  try {
    const userClass = await UserClass.findByPk(id);
    if (!userClass) {
      return res.status(404).json({ message: 'User Class not found' });
    }

    // Check if the new class_id exists before updating user_class
    const existingClass = await Class.findByPk(class_id);
    if (!existingClass) {
      return res.status(404).json({ message: 'New class not found' });
    }

    await userClass.update({ user_id, class_id });
    res.json(userClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserClass = async (req, res) => {
  const { id } = req.params;
  try {
    const userClass = await UserClass.findByPk(id);
    if (!userClass) {
      return res.status(404).json({ message: 'User Class not found' });
    }
    await userClass.destroy();
    res.json({ message: 'User Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUserClasses,
  getUserClassById,
  createUserClass,
  updateUserClass,
  deleteUserClass,
  getAllUserClassesWithDetails,
  getUserClassByIdWithDetails
};