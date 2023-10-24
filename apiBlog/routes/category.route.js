const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');

// Define routes
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getByPk);
router.delete('/:id', CategoryController.deleteByPk);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);

// TODO: Retrieving articles linked to a category.
// ....

module.exports = router;
