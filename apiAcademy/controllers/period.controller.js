
const { period:Period } = require('../configs/db/config/db'); 

// Controller functions for CRUD operations
const getAllPeriods = async (req, res) => {
  try {
    const periods = await Period.findAll();
    res.json(periods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPeriodById = async (req, res) => {
  const { id } = req.params;
  try {
    const period = await Period.findByPk(id);
    if (!period) {
      return res.status(404).json({ message: 'Period not found' });
    }
    res.json(period);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPeriod = async (req, res) => {
  const { name } = req.body;
  try {
    const newPeriod = await Period.create({ name });
    res.status(201).json(newPeriod);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePeriod = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const period = await Period.findByPk(id);
    if (!period) {
      return res.status(404).json({ message: 'Period not found' });
    }
    await period.update({ name });
    res.json(period);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePeriod = async (req, res) => {
  const { id } = req.params;
  try {
    const period = await Period.findByPk(id);
    if (!period) {
      return res.status(404).json({ message: 'Period not found' });
    }
    await period.destroy();
    res.json({ message: 'Period deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPeriods,
  getPeriodById,
  createPeriod,
  updatePeriod,
  deletePeriod,
};
