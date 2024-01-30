const express = require('express');
const router = express.Router();
const userClassController = require('../controllers/user_class.controller');

router.get('/', userClassController.getAllUserClasses);
router.get('/details', userClassController.getAllUserClassesWithDetails);

router.get('/:id', userClassController.getUserClassById);
router.get('/:id/details', userClassController.getUserClassByIdWithDetails);

// router('/users', userClassController.getUsers);

router.post('/', userClassController.createUserClass);

router.put('/:id', userClassController.updateUserClass);

router.delete('/:id', userClassController.deleteUserClass);


module.exports = router;
