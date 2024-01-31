
const { 
  student_ma_tutor:StudentMaTutor,
  USER_ENTITY:USER_ENTITY
} = require('../configs/db/config/db'); 

// Controller functions for CRUD operations
const getAllStudentMaTutors = async (req, res) => {
  try {
    const studentMaTutors = await StudentMaTutor.findAll();
    res.json(studentMaTutors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentMaTutorById = async (req, res) => {
  const { id } = req.params;
  try {
    const studentMaTutor = await StudentMaTutor.findByPk(id);
    if (!studentMaTutor) {
      return res.status(404).json({ message: 'StudentMaTutor not found' });
    }
    res.json(studentMaTutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStudentMaTutor = async (req, res) => {
  const { student_id, tutor_id, ma_id } = req.body;
  try {
    const newStudentMaTutor = await StudentMaTutor.create({ student_id, tutor_id, ma_id });
    res.status(201).json(newStudentMaTutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudentMaTutor = async (req, res) => {
  const { id } = req.params;
  const { student_id, tutor_id, ma_id } = req.body;
  try {
    const studentMaTutor = await StudentMaTutor.findByPk(id);
    if (!studentMaTutor) {
      return res.status(404).json({ message: 'StudentMaTutor not found' });
    }
    await studentMaTutor.update({ student_id, tutor_id, ma_id });
    res.json(studentMaTutor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStudentMaTutor = async (req, res) => {
  const { id } = req.params;
  try {
    const studentMaTutor = await StudentMaTutor.findByPk(id);
    if (!studentMaTutor) {
      return res.status(404).json({ message: 'StudentMaTutor not found' });
    }
    await studentMaTutor.destroy();
    res.json({ message: 'StudentMaTutor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getStudentsAndMAByTutorId = async (req, res) => {
  const tutorId = req.params.tutorId; // Assuming the tutor ID is provided in the request parameters
  console.log("_________"+tutorId)
  try {
    const studentsAndMA = await StudentMaTutor.findAll({
      attributes: [],
      where: { tutor_id: tutorId }, // Filtering by tutor ID
      include: [
        {
          model: USER_ENTITY,
          as: 'student',
          attributes: ['ID', 'FIRST_NAME', 'LAST_NAME', 'EMAIL'], // Add desired student attributes
        },
        {
          model: USER_ENTITY,
          as: 'ma',
          attributes: ['ID', 'FIRST_NAME', 'LAST_NAME', 'EMAIL'], // Add desired ma attributes
        }
      ],
    });

    res.status(200).json(studentsAndMA);
  } catch (error) { 
    res.status(500).json({ error: 'Failed to fetch students and their MA by Tutor ID' });
  }
};



const getStudentsAndTutorByMAId = async (req, res) => {
  const maId = req.params.maId;  

  try {
    const studentsAndTutor = await StudentMaTutor.findAll({
      attributes: [],
      where: { ma_id: maId },  
      include: [
        {
          model: USER_ENTITY,
          as: 'student',
          attributes: ['ID', 'FIRST_NAME', 'LAST_NAME', 'EMAIL'],  
        },
        {
          model: USER_ENTITY,
          as: 'tutor',
          attributes: ['ID', 'FIRST_NAME', 'LAST_NAME', 'EMAIL'],  
        }
      ],
    });

    res.status(200).json(studentsAndTutor);
  } catch (error) { 
    res.status(500).json({ error: 'Failed to fetch students and their tutor by MA ID' });
  }
};


module.exports = {
  getAllStudentMaTutors,
  getStudentMaTutorById,
  createStudentMaTutor,
  updateStudentMaTutor,
  deleteStudentMaTutor,
  getStudentsAndMAByTutorId,
  getStudentsAndTutorByMAId
};
