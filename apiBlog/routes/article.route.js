const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article.controller');
const {verifyRequestFile} = require('../validators/commonly_used.validator')
const {verifyArticle, validateGetFilteredArticles} = require('../validators/article.validator')
const {verifyRequestParamId, verifyRequestBodyIds} = require('../validators/commonly_used.validator')


// Define routes
router.get('/', ArticleController.getAll);


router.delete('/:id', verifyRequestParamId, ArticleController.deleteByPk);

router.delete('/', verifyRequestBodyIds, ArticleController.deleteMultipleByIds);

//we are using uploadArticleImagesMiddleware that will check and look for images files then save them on the server and prepare req.thumbnail & req.principal_image ==> other middlewares ==> store on the DB
router.post('/', verifyArticle, ArticleController.create);

router.put('/:id', verifyRequestParamId, verifyRequestFile, verifyArticle, ArticleController.update);

// Additional routes



router.post('/filter', validateGetFilteredArticles, ArticleController.getFilteredArticles);

// Retrieve a list of articles with extended details including author info and tags title
router.get('/details', ArticleController.getArticlesWithDetails);
// A specific article with extended details including author info and tags title

router.get('/details/:id', verifyRequestParamId,ArticleController.getArticleWithDetails);
// Retrieve a list of articles by category

router.get('/category/all/:id', verifyRequestParamId, ArticleController.getArticlesByCategory);

router.get('/category/:id', verifyRequestParamId, ArticleController.getArticlesByCategoryPaginated);


// Retrieve a list of articles by tag
router.get('/tag/:id', verifyRequestParamId, ArticleController.getArticlesByTag);

// Retrieve a list of articles by multiple tags
router.get('/tags/:tagIds', ArticleController.getArticlesByTags);

// Retrieve a list of articles by authorId
router.get('/author/:id', verifyRequestParamId, ArticleController.getArticlesByAuthor);

// Retrieve a list of articles by time-period
router.get('/time-period', ArticleController.getArticlesByTimePeriod);

// Retrieve the latest shared article (latest update).
router.get('/last-shared-article', ArticleController.getLastSharedArticle);

router.get('/:id/comments', verifyRequestParamId, ArticleController.getCommentsForArticle);


//INFO : to avoid conflict with GET /details, we've put the getById here (last ;).
router.get('/:id', verifyRequestParamId, ArticleController.getByPk);








// TODO:

module.exports = router;
