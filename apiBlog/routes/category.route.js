const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');

// Define routes
router.get('/', CategoryController.getAll);
router.delete('/:id', CategoryController.deleteByPk);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);

router.get('/top-categories', CategoryController.getCategoriesByArticleCount);


router.get('/:id', CategoryController.getByPk);
// TODO: Retrieving articles linked to a category.
// ....

module.exports = router;
