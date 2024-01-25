const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/', UserController.getAll);
router.get('/:id', UserController.getByPk);

module.exports = router;
