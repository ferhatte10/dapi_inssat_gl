const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');
const {
  verifyRequestParamId
} = require('../validators/commonly_used.validator');
const {
  validateClassCreation,
  validateClassUpdate
} = require('../validators/class.validator');

router.get('/', classController.getAllClasses);


router.get('/:id', verifyRequestParamId, classController.getClassById);
router.get('/:id/users', verifyRequestParamId, classController.getClassByIdUsers);


router.post('/', validateClassCreation, classController.createClass);
router.put('/:id', verifyRequestParamId, validateClassUpdate, classController.updateClass);
router.delete('/:id', verifyRequestParamId, classController.deleteClass);

module.exports = router;
