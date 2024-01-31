const express = require('express');
const router = express.Router();
const userCompanyController = require('../controllers/user_company.controller');

const {
    validateUserCompanyCreation,
    validateUserCompanyUpdate
  } = require('../validators/user_company.validator');
  const {
    verifyRequestParamId
  } = require('../validators/commonly_used.validator');

router.get('/', userCompanyController.getAllUserCompanies);
router.get('/:id', verifyRequestParamId,  userCompanyController.getUserCompanyById);
router.post('/', validateUserCompanyCreation, userCompanyController.createUserCompany);
router.put('/:id', verifyRequestParamId, validateUserCompanyUpdate, userCompanyController.updateUserCompany);
router.delete('/:id', verifyRequestParamId, userCompanyController.deleteUserCompany);

module.exports = router;
