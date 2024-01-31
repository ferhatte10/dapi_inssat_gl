const express = require('express');
const router = express.Router();
const userClassController = require('../controllers/user_class.controller');
//import validator
const {
  validateUserClassCreation,
  validateUserClassUpdate
} = require('../validators/user_class.validator');
const {
  verifyRequestParamId
} = require('../validators/commonly_used.validator');

router.get('/', userClassController.getAllUserClasses);
router.get('/:id', verifyRequestParamId, userClassController.getUserClassById);
router.post('/', validateUserClassCreation, userClassController.createUserClass);
router.put('/:id', verifyRequestParamId, validateUserClassUpdate, userClassController.updateUserClass);
router.delete('/:id', verifyRequestParamId, userClassController.deleteUserClass);

router.get('/details', userClassController.getAllUserClassesWithDetails);
router.get('/:id/details',verifyRequestParamId, userClassController.getUserClassByIdWithDetails);

// router('/users', userClassController.getUsers);

module.exports = router;

