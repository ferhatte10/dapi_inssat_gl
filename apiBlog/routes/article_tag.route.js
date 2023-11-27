const express = require('express');
const router = express.Router();
const articleTagController = require('../controllers/article_tag.controller');
const {verifyArticleTag} = require('../validators/article_tag.validator')

// Create a new article_tag association
router.post('/', verifyArticleTag, articleTagController.createArticleTag); 

module.exports = router;