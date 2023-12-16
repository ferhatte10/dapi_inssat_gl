
const { assessment : Assessment } = require('../configs/db/config/db'); 

// Controller functions for CRUD operations
const getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.findAll();
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAssessmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const assessment = await Assessment.findByPk(id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAssessment = async (req, res) => {
  const { name, coefficient } = req.body;
  try {
    const newAssessment = await Assessment.create({ name, coefficient });
    res.status(201).json(newAssessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAssessment = async (req, res) => {
  const { id } = req.params;
  const { name, coefficient } = req.body;
  try {
    const assessment = await Assessment.findByPk(id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    await assessment.update({ name, coefficient });
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAssessment = async (req, res) => {
  const { id } = req.params;
  try {
    const assessment = await Assessment.findByPk(id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    await assessment.destroy();
    res.json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAssessments,
  getAssessmentById,
  createAssessment,
  updateAssessment,
  deleteAssessment,
};
