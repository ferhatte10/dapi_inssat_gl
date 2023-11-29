const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');
const {verifyRequestParamId} = require('../validators/commonly_used.validator')
const {verifyCategory} = require('../validators/category.validator')


// Define routes
router.get('/', CategoryController.getAll);
router.delete('/:id',verifyRequestParamId,  CategoryController.deleteByPk);
router.post('/', verifyCategory, CategoryController.create);
router.put('/:id',verifyRequestParamId, verifyCategory, CategoryController.update);

router.get('/top-categories', CategoryController.getCategoriesByArticleCount);


router.get('/:id',verifyRequestParamId, CategoryController.getByPk);
// TODO: Retrieving articles linked to a category.
// ....

module.exports = router;
