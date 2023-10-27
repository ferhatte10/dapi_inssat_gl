const express = require('express');
const router = express.Router();
const articleTagController = require('../controllers/article_tag.controller');

// Create a new article_tag association
router.post('/', articleTagController.createArticleTag); 

module.exports = router;