const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article.controller');
const {verifyRequestFile} = require('../validators/commonly_used.validator')
const {verifyArticle} = require('../validators/article.validator')
const {verifyRequestParamId} = require('../validators/commonly_used.validator')

// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart();

// Import the uploadImagesMiddleware
const uploadArticleImagesMiddleware = require('../middlewares/uploadArticleImagesMiddleware');

// Define routes
router.get('/', ArticleController.getAll);

router.delete('/:id', ArticleController.deleteByPk);

//we are using uploadArticleImagesMiddleware that will check and look for images files then save them on the server and prepare req.thumbnail & req.principal_image ==> other middlewares ==> store on the DB
router.post('/', uploadArticleImagesMiddleware, verifyRequestFile, verifyArticle, ArticleController.create);

router.put('/:id', verifyRequestParamId, uploadArticleImagesMiddleware, verifyRequestFile, verifyArticle, ArticleController.update);

// Additional routes

// Retrieve a list of articles with extended details including author info and tags title
router.get('/details', ArticleController.getArticlesWithDetails);
// A specific article with extended details including author info and tags title

router.get('/details/:id', ArticleController.getArticleWithDetails);
// Retrieve a list of articles by category

router.get('/category/:categoryId', ArticleController.getArticlesByCategory);
// Retrieve a list of articles by tag

router.get('/tag/:tagId', ArticleController.getArticlesByTag);
// Retrieve a list of articles by multiple tags

router.get('/tags/:tagIds', ArticleController.getArticlesByTags);
// Retrieve a list of articles by authorId

router.get('/author/:authorId', ArticleController.getArticlesByAuthor);
// Retrieve a list of articles by time-period

router.get('/time-period', ArticleController.getArticlesByTimePeriod);
// exemple de requete = GET /articles/time-period?dateStart=2023-01-01&dateEnd=2023-12-31



// Retrieve the latest shared article (latest update).
router.get('/last-shared-article', ArticleController.getLastSharedArticle);


//INFO : to avoid conflict with GET /details, we've put the getById here (last ;).
router.get('/:id', ArticleController.getByPk);


// TODO:

module.exports = router;
