const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/like.controller');

// Define routes
router.get('/', LikeController.getAll);
router.get('/:id', LikeController.getByPk);
router.delete('/:id', LikeController.deleteByPk);
router.post('/', LikeController.create);
router.put('/:id', LikeController.update);

module.exports = router;
