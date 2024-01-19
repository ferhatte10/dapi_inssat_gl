const express = require('express');
const router = express.Router();
const {
    uploadFile,
    getFile,
    getFilesPaginated,
    getDefaultFile
} = require('../controllers/uploads.controller');

const {
    verifyIfValidFile,
    validatePDF
} = require('../validators/upload.validator');


// Route for file upload
router.post('/uploads', verifyIfValidFile, uploadFile);

// Endpoint to get default files
router.get('/uploads/default/:fileName', getDefaultFile);

// Endpoint to access a specific file
router.get('/uploads/:userID/:folderName/:fileName', getFile);


// Endpoint to get files paginated by user ID
router.get('/uploads/:userID/:page', getFilesPaginated);


module.exports = router;
