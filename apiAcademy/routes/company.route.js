const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const {
  verifyRequestParamId
} = require('../validators/commonly_used.validator');
const {
  validateCompanyCreation,
  validateCompanyUpdate
} = require('../validators/company.validator');

router.get('/', companyController.getAllCompanies);
router.get('/:id', verifyRequestParamId, companyController.getCompanyById);
router.post('/', validateCompanyCreation, companyController.createCompany);
router.put('/:id', verifyRequestParamId, validateCompanyUpdate, companyController.updateCompany);
router.delete('/:id', verifyRequestParamId, companyController.deleteCompany);

module.exports = router;
