const express = require('express');
const router = express.Router();
const levelController = require('../controllers/level.controller');
const {
  verifyRequestParamId
} = require('../validators/commonly_used.validator');
const {
  validateLevelCreation,
  validateLevelUpdate
} = require('../validators/level.validator');

router.get('/', levelController.getAllLevels);
router.get('/:id', verifyRequestParamId, levelController.getLevelById);
router.post('/', validateLevelCreation, levelController.createLevel);
router.put('/:id', verifyRequestParamId, validateLevelUpdate, levelController.updateLevel);
router.delete('/:id', verifyRequestParamId, levelController.deleteLevel);

module.exports = router;
