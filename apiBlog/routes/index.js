const express = require('express');
const {secure, getJwksService} = require("../configs/auth");
const router = express.Router();


// Mounting each route under the right path
// TODO : add , create functions to handle the claims object in the request created but the alternative keycloak middleware
router.use('/users', require('./user.route'));
router.use('/categories', require('./category.route'));
router.use('/articles', require('./article.route'));
router.use('/comments', require('./comment.route'));
router.use('/likes', require('./like.route'));
router.use('/tags', require('./tag.route'));
router.use('/article-tags', require('./article_tag.route'));
router.use('/followers', require('./follower.route'));

//Dealing with images upload & fetch
router.use('/uploads', require('./upload.route'));

module.exports = router;
