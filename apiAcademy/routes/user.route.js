const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const {uuidValidator} = require("../validators/uuid.validator");
const {userGradesPeriodValidator} = require("../validators/user.validator");
const {verifyRoles} = require("../utils/verifyRoles");

router.get('/', (req,res,nex)=>{
    verifyRoles(req,res,nex,["apprenticeship-manager"]);
},UserController.getAll);

router.get('/:id', uuidValidator ,UserController.getByPk);
router.get('/:id/suivi',(req,res,nex)=>{
    verifyRoles(req,res,nex,["student","student-tutor","student-supervisor"]);
}, uuidValidator,  UserController.getSuivi);

router.get('/:id/grades', (req,res,nex)=>{
    verifyRoles(req,res,nex,["student","student-tutor","student-supervisor"]);
},uuidValidator,  UserController.getByPkPeriods);

router.get('/:id/grades/:periodId', (req,res,nex)=>{
    verifyRoles(req,res,nex,["student","student-tutor","student-supervisor"]);
},userGradesPeriodValidator,  UserController.getByPkPeriod);


module.exports = router;
