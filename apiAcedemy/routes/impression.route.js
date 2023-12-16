const express = require('express');
const router = express.Router();
const impressionController = require('../controllers/impression.controller');
const {
  verifyRequestParamId
} = require('../validators/commonly_used.validator');
const {
  validateImpressionCreation,
  validateImpressionUpdate
} = require('../validators/impression.validator');

router.get('/', impressionController.getAllImpressions);
router.get('/:id', verifyRequestParamId, impressionController.getImpressionById);
router.post('/', validateImpressionCreation, impressionController.createImpression);
router.put('/:id', verifyRequestParamId, validateImpressionUpdate, impressionController.updateImpression);
router.delete('/:id', verifyRequestParamId, impressionController.deleteImpression);

module.exports = router;
