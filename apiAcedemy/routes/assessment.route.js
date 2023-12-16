const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessment.controller');
const {
  verifyRequestParamId
} = require('../validators/commonly_used.validator');
const {
  validateAssessmentCreation,
  validateAssessmentUpdate
} = require('../validators/assessment.validator');

router.get('/', assessmentController.getAllAssessments);
router.get('/:id', verifyRequestParamId, assessmentController.getAssessmentById);
router.post('/', validateAssessmentCreation, assessmentController.createAssessment);
router.put('/:id', verifyRequestParamId, validateAssessmentUpdate, assessmentController.updateAssessment);
router.delete('/:id', verifyRequestParamId, assessmentController.deleteAssessment);

module.exports = router;
