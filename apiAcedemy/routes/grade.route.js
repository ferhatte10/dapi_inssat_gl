const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/grade.controller');
const {
  verifyRequestParamId
} = require('../validators/commonly_used.validator');
const {
  validateGradeCreation,
  validateGradeUpdate
} = require('../validators/grade.validator');

router.get('/', gradeController.getAllGrades);
router.get('/:id', verifyRequestParamId, gradeController.getGradeById);
router.post('/', validateGradeCreation, gradeController.createGrade);
router.put('/:id', verifyRequestParamId, validateGradeUpdate, gradeController.updateGrade);
router.delete('/:id', verifyRequestParamId, gradeController.deleteGrade);

module.exports = router;
