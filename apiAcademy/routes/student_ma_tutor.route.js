const express = require('express');
const router = express.Router();
const studentMaTutorController = require('../controllers/student_ma_tutor.controller');
const {
  verifyRequestParamId
} = require('../validators/commonly_used.validator');
const {
  validateStudentMaTutorCreation,
  validateStudentMaTutorUpdate
} = require('../validators/student_ma_tutor.validator');

router.get('/', studentMaTutorController.getAllStudentMaTutors);
router.get('/:id', verifyRequestParamId, studentMaTutorController.getStudentMaTutorById);
router.post('/', validateStudentMaTutorCreation, studentMaTutorController.createStudentMaTutor);
router.put('/:id', verifyRequestParamId, validateStudentMaTutorUpdate, studentMaTutorController.updateStudentMaTutor);
router.delete('/:id', verifyRequestParamId, studentMaTutorController.deleteStudentMaTutor);
router.get('/tutor/:tutorId', studentMaTutorController.getStudentsAndMAByTutorId);
router.get('/ma/:maId', studentMaTutorController.getStudentsAndTutorByMAId);
router.get('/student/:studentId', studentMaTutorController.getStudentsAndTutorAndMaByStudentId);

module.exports = router;
