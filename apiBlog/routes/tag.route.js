const express = require('express');
const router = express.Router();
const TagController = require('../controllers/tag.controller');

// Define routes
router.get('/', TagController.getAll);
router.get('/:id', TagController.getByPk);
router.delete('/:id', TagController.deleteByPk);
router.post('/', TagController.create);
router.put('/:id', TagController.update);



module.exports = router;
