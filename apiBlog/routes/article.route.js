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

// Retrieve a list of articles by category
router.get('/categories/:categoryId', ArticleController.getArticlesByCategory);

// Retrieve a list of articles by tag
router.get('/tag/:tagId', ArticleController.getArticlesByTag);

// Retrieve a list of articles by multiple tags
router.get('/tags/:tagIds', ArticleController.getArticlesByTags);

// Retrieve a list of articles by authorId
router.get('/author/:authorId', ArticleController.getArticlesByAuthor);

// Retrieve a list of articles by time-period
router.get('/time-period', ArticleController.getArticlesByTimePeriod);
// exemple de requete = GET /articles/time-period?dateStart=2023-01-01&dateEnd=2023-12-31


// TODO: 

module.exports = router;
