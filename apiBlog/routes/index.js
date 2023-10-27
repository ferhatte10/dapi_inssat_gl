const express = require('express');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const articleRoute = require('./article.route'); // Include article route
const article_tagRoute = require('./article_tag.route');
const commentRoute = require('./comment.route'); // Include comment route
const likeRoute = require('./like.route'); // Include like route
const tagRoute = require('./tag.route'); // Include tag route

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: {
      message: 'Welcome to the blog api',
      documentation: `${req.originalUrl}api-doc`,
    },
  });
});

// Mounting each route under the right path
router.use('/users', userRoute); 
router.use('/categories', categoryRoute);  
router.use('/articles', articleRoute); 
router.use('/comments', commentRoute); 
router.use('/likes', likeRoute);
router.use('/tags', tagRoute);
router.use('/article-tags', article_tagRoute); 

module.exports = router;
