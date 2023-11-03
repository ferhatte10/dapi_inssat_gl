// imageUploadManager.js

const { UPLOADS_PATH } = require('../configs/env');
const ImageUploadManager = require('./class/ImageUploadManager');

// Create a single instance of ImageUploadManager
const uploadManager = new ImageUploadManager(UPLOADS_PATH, 'http://localhost:5000');

module.exports = uploadManager;
