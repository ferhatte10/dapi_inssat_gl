const path = require('path');


// Import the imageUploadManager
const uploadManager = require('../utils/imageUploadManager');

// Define the controller methods
const UploadController = {};

UploadController.fetch = async (req, res) => {
    const filePath = req.params[0]; // Extract the entire path after /uploads/
    uploadManager.retrieveFile(filePath, res);
}

UploadController.save = async (req, res) => {
    try {
         
  console.log(req.file)
  console.log(req.body)
  console.log(req.file)
      if (req.file instanceof Error) {
        console.error('File upload error:', req.file);
        return res.status(500).json({ error: 'File upload error' });
      }
  
      // Construct the URL based on the server's configuration and the uploaded filename
      const imageUrl = uploadManager.getFullImageUrl(req.file.filename);
   
  
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error' });
    }
}

module.exports = UploadController;
