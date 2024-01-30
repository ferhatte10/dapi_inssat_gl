const express = require('express');
const router = express.Router();
const userCompanyController = require('../controllers/user_company.controller');

router.get('/', userCompanyController.getAllUserCompanies);
router.get('/details', userCompanyController.getAllUserCompaniesWithDetails);
router.get('/:id', userCompanyController.getUserCompanyById);
router.get('/details/:id', userCompanyController.getUserCompanyByIdWithDetails);


router.post('/', userCompanyController.createUserCompany);
router.put('/:id', userCompanyController.updateUserCompany);
router.delete('/:id', userCompanyController.deleteUserCompany);

module.exports = router;
