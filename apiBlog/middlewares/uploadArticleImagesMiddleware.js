// // Import the imageUploadManager
// const uploadManager = require('../utils/imageUploadManager');

// const uploadArticleImagesMiddleware = (req, res, next) => {
//     const upload = uploadManager.upload.array('images', 2);  
  
//     upload(req, res, (err) => {
//       if (err) {
//         console.error('Error uploading images:', err);
//         return res.status(500).json({ error: 'Image upload error' });
//       }
   
//       // Images are uploaded successfully
//       // Attach the file paths to req.body
//       req.body.thumbnail = req.files[0].filename;
//       req.body.principal_image = req.files[1].filename; 
  
//       next();
//     });
//   };
  
//   module.exports = uploadArticleImagesMiddleware;
  