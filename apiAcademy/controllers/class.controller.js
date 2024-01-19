
const { class_: Class } = require('../configs/db/config/db'); 

// Controller functions for CRUD operations
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const classObj = await Class.findByPk(id);
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClass = async (req, res) => {
  const { name, apprenticeship } = req.body;
  try {
    const newClass = await Class.create({ name, apprenticeship });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClass = async (req, res) => {
  const { id } = req.params;
  const { name, apprenticeship } = req.body;
  try {
    const classObj = await Class.findByPk(id);
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }
    await classObj.update({ name, apprenticeship });
    res.json(classObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const classObj = await Class.findByPk(id);
    if (!classObj) {
      return res.status(404).json({ message: 'Class not found' });
    }
    await classObj.destroy();
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};
