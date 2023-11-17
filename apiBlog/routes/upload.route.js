const express = require('express');
const router = express.Router();
const UploadController = require('../controllers/uploads.controller');
 

// Import the imageUploadManager
const uploadManager = require('../utils/imageUploadManager');


// router.delete('/:id', UploadController.deleteByPk);
router.post('/', uploadManager.upload.single('image'), UploadController.save); 
// Define routes
router.get('/*', UploadController.fetch);

 
module.exports = router;
