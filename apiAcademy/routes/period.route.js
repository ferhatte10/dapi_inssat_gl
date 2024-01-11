const express = require('express');
const router = express.Router();
const periodController = require('../controllers/period.controller');
const {
  verifyRequestParamId
} = require('../validators/commonly_used.validator');
const {
  validatePeriodCreation,
  validatePeriodUpdate
} = require('../validators/period.validator');

router.get('/', periodController.getAllPeriods);
router.get('/:id', verifyRequestParamId, periodController.getPeriodById);
router.post('/', validatePeriodCreation, periodController.createPeriod);
router.put('/:id', verifyRequestParamId, validatePeriodUpdate, periodController.updatePeriod);
router.delete('/:id', verifyRequestParamId, periodController.deletePeriod);

module.exports = router;
