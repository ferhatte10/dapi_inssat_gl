const express = require('express');
const router = express.Router();
const FollowerController = require('../controllers/follower.controller');

// Define routes
router.get('/', FollowerController.getAll);
router.get('/:id', FollowerController.getByPk);
router.delete('/:id', FollowerController.deleteByPk);
router.post('/', FollowerController.create);
router.put('/:id', FollowerController.update);

// Additional routes
// Retrieve a list of followers by Follower ID
router.get('/by-follower/:followerId', FollowerController.getFollowersByFollowerId);

// Retrieve a list of followers by Following ID
router.get('/by-following/:followingId', FollowerController.getFollowersByFollowingId);

module.exports = router;