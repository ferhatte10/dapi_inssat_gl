const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article.controller');

// Define routes
router.get('/', ArticleController.getAll);
//router.get('/:id', ArticleController.getByPk);
router.delete('/:id', ArticleController.deleteByPk);
router.post('/', ArticleController.create);
router.put('/:id', ArticleController.update);

// Additional routes
// Retrieve a list of articles with extended details including author info and tags title
router.get('/details', ArticleController.getArticlesWithDetails);
// TODO: 

module.exports = router;
