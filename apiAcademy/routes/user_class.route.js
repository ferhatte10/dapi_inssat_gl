const express = require('express');
const router = express.Router();
const userClassController = require('../controllers/user_class.controller');

router.get('/', userClassController.getAllUserClasses);
router.get('/:id', userClassController.getUserClassById);
router.post('/create', userClassController.createUserClass);
router.put('/:id', userClassController.updateUserClass);
router.delete('/:id', userClassController.deleteUserClass);

module.exports = router;
