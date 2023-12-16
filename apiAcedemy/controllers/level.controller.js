
const { level:Level } = require('../configs/db/config/db'); 

// Controller functions for CRUD operations
const getAllLevels = async (req, res) => {
  try {
    const levels = await Level.findAll();
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLevelById = async (req, res) => {
  const { id } = req.params;
  try {
    const level = await Level.findByPk(id);
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    res.json(level);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLevel = async (req, res) => {
  const { name } = req.body;
  try {
    const newLevel = await Level.create({ name });
    res.status(201).json(newLevel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLevel = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const level = await Level.findByPk(id);
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    await level.update({ name });
    res.json(level);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLevel = async (req, res) => {
  const { id } = req.params;
  try {
    const level = await Level.findByPk(id);
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    await level.destroy();
    res.json({ message: 'Level deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllLevels,
  getLevelById,
  createLevel,
  updateLevel,
  deleteLevel,
};
