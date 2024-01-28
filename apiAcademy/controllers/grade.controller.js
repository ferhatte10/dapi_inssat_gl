
const { grade : Grade, period: Period, assessment: Assessment, section: Section } =  require('../configs/db/config/db'); 


// Controller functions for CRUD operations
const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGradeById = async (req, res) => {
  const { id } = req.params;
  try {
    const grade = await Grade.findByPk(id);
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.json(grade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGrade = async (req, res) => {
  const { student_id, grade, assessment_id, period_id, comment, section_id } = req.body;
  try {
    const newGrade = await Grade.create({ student_id, grade, assessment_id, period_id, comment, section_id });
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGrade = async (req, res) => {
  const { id } = req.params;
  const { student_id, grade, assessment_id, period_id, comment, section_id } = req.body;
  try {
    const gradeObj = await Grade.findByPk(id);
    if (!gradeObj) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    await gradeObj.update({ student_id, grade, assessment_id, period_id, comment, section_id });
    res.json(gradeObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGrade = async (req, res) => {
  const { id } = req.params;
  try {
    const gradeObj = await Grade.findByPk(id);
    if (!gradeObj) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    await gradeObj.destroy();
    res.json({ message: 'Grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getGradesByUserId = async (req, res) => {
  const { student_id } = req.params;
  try {
    const grade = await Grade.findAll({
      where: { student_id: student_id },
      include: [
        {
          model: Assessment,
          as: 'assessment',
          attributes: ['name', 'coefficient', 'position']
        },
        {
          model: Period,
          as: 'period',
          attributes: ['name', 'number', 'description']
        },
        {
          model: Section,
          as: 'section',
          attributes: ['title', 'description']
        }
      ]
  });
    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }
    res.json(grade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
  getGradesByUserId
};
