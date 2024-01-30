const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const {uuidValidator} = require("../validators/uuid.validator");

router.get('/', UserController.getAll);
router.get('/:id', uuidValidator ,UserController.getByPk);
router.get('/:id/suivi', uuidValidator,  UserController.getSuivi);

module.exports = router;
