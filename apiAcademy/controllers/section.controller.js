
const { section:Section } = require('../configs/db/config/db'); 

// Controller functions for CRUD operations
const getAllSections = async (req, res) => {
  try {
    const sections = await Section.findAll();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSectionById = async (req, res) => {
  const { id } = req.params;
  try {
    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSection = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newSection = await Section.create({ title, description });
    res.status(201).json(newSection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSection = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    await section.update({ title, description });
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSection = async (req, res) => {
  const { id } = req.params;
  try {
    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    await section.destroy();
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
};
