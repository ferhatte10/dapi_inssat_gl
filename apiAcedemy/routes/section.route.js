const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/section.controller');
const {
  verifyRequestParamId
} = require('../validators/commonly_used.validator');
const {
  validateSectionCreation,
  validateSectionUpdate
} = require('../validators/section.validator');

router.get('/', sectionController.getAllSections);
router.get('/:id', verifyRequestParamId, sectionController.getSectionById);
router.post('/', validateSectionCreation, sectionController.createSection);
router.put('/:id', verifyRequestParamId, validateSectionUpdate, sectionController.updateSection);
router.delete('/:id', verifyRequestParamId, sectionController.deleteSection);

module.exports = router;
