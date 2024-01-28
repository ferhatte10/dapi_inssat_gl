const express = require('express');
const router = express.Router();
const userCompanyController = require('../controllers/user_company.controller');

router.get('/', userCompanyController.getAllUserCompanies);
router.get('/:id', userCompanyController.getUserCompanyById);
router.post('/create', userCompanyController.createUserCompany);
router.put('/:id', userCompanyController.updateUserCompany);
router.delete('/:id', userCompanyController.deleteUserCompany);
router.get('/details/:id', userCompanyController.getUserCompanyDetailsByUserId);

module.exports = router;
