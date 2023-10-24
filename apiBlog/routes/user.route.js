const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// Define routes
router.get('/', UserController.getAll);
router.get('/:id', UserController.getByPk);
router.delete('/:id', UserController.deleteByPk);
router.post('/', UserController.create);
router.put('/:id', UserController.update);

// TODO: Retrieving user's liked articles
// TODO: Managing user settings
// TODO: Retrieving Followers and Following
// Zak  ;) and maybe more 

module.exports = router;
