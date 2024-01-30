const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const {uuidValidator} = require("../validators/uuid.validator");
const {userGradesPeriodValidator} = require("../validators/user.validator");

router.get('/', UserController.getAll);
router.get('/:id', uuidValidator ,UserController.getByPk);
router.get('/:id/suivi', uuidValidator,  UserController.getSuivi);
router.get('/:id/grades', uuidValidator,  UserController.getByPkPeriods);
router.get('/:id/grades/:periodId', userGradesPeriodValidator,  UserController.getByPkPeriod);


module.exports = router;
