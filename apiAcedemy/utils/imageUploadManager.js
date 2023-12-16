// imageUploadManager.js

const { UPLOADS_PATH } = require('../configs/env');
const ImageUploadManager = require('./class/ImageUploadManager');
const {API_GATEWAY_URL} = require('../configs/env');

// Create a single instance of ImageUploadManager
const uploadManager = new ImageUploadManager(UPLOADS_PATH, API_GATEWAY_URL);

module.exports = uploadManager;
