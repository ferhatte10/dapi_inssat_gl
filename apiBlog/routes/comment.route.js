const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');

// Define routes
router.get('/', CommentController.getAll);
router.get('/:id', CommentController.getByPk);
router.delete('/:id', CommentController.deleteByPk);
router.post('/', CommentController.create);
router.put('/:id', CommentController.update);

//TODO: Retrieving comments within an article 
//TODO: replying to an other comment (hint : comment.parent_id).
//....

module.exports = router;
