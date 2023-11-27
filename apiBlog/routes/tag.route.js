const express = require('express');
const router = express.Router();
const TagController = require('../controllers/tag.controller');
const tagValidator = require('../validators/tag.validator');
const {verifyRequestParamId} = require('../validators/commonly_used.validator')

// Define routes
router.get('/', TagController.getAll);
router.get('/:id', verifyRequestParamId, TagController.getByPk);
router.delete('/:id',verifyRequestParamId, TagController.deleteByPk);
router.post('/', tagValidator.verifyTag, TagController.create);
router.put('/:id',verifyRequestParamId, tagValidator.verifyTag, TagController.update);



module.exports = router;
