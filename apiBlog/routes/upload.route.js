const express = require('express');
const router = express.Router();
const UploadController = require('../controllers/uploads.controller');
const {verifyRequestFile} =  require('../validators/commonly_used.validator');

// Import the imageUploadManager
const uploadManager = require('../utils/imageUploadManager');


// router.delete('/:id', UploadController.deleteByPk);
router.post('/', uploadManager.upload.single('image'), verifyRequestFile, UploadController.save); 
// Define routes
router.get('/*', UploadController.fetch);

 
module.exports = router;
