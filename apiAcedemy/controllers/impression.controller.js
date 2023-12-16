// controllers/impressionController.js

const { impression : Impression } =  require('../configs/db/config/db'); 

// Controller functions for CRUD operations
const getAllImpressions = async (req, res) => {
  try {
    const impressions = await Impression.findAll();
    res.json(impressions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getImpressionById = async (req, res) => {
  const { id } = req.params;
  try {
    const impression = await Impression.findByPk(id);
    if (!impression) {
      return res.status(404).json({ message: 'Impression not found' });
    }
    res.json(impression);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createImpression = async (req, res) => {
  const { content, level_id, activity_id, period_id, student_id } = req.body;
  try {
    const newImpression = await Impression.create({ content, level_id, activity_id, period_id, student_id });
    res.status(201).json(newImpression);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateImpression = async (req, res) => {
  const { id } = req.params;
  const { content, level_id, activity_id, period_id, student_id } = req.body;
  try {
    const impression = await Impression.findByPk(id);
    if (!impression) {
      return res.status(404).json({ message: 'Impression not found' });
    }
    await impression.update({ content, level_id, activity_id, period_id, student_id });
    res.json(impression);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteImpression = async (req, res) => {
  const { id } = req.params;
  try {
    const impression = await Impression.findByPk(id);
    if (!impression) {
      return res.status(404).json({ message: 'Impression not found' });
    }
    await impression.destroy();
    res.json({ message: 'Impression deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllImpressions,
  getImpressionById,
  createImpression,
  updateImpression,
  deleteImpression,
};
