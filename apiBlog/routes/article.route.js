const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article.controller');

// Define routes
router.get('/', ArticleController.getAll);
router.get('/:id', ArticleController.getByPk);
router.delete('/:id', ArticleController.deleteByPk);
router.post('/', ArticleController.create);
router.put('/:id', ArticleController.update);

// Additional routes
// TODO: 

module.exports = router;
