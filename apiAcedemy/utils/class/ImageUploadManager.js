const multer = require('multer');
const fs = require('fs');
const path = require('path');

const contentTypeMap = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
};
class ImageUploadManager {
  constructor(uploadDir, baseUrl) {
    this.uploadDir = uploadDir;
    this.baseUrl = baseUrl;
    this.initializeDirectory();
    this.setupMulter();
  }

  initializeDirectory() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  setupMulter() {
    this.upload = multer({
      storage: this.createStorageEngine(),
      // limits: {
      //   fileSize: 25 * 1024 * 1024, // 10dMB file size limit
      // },
      fileFilter: (req, file, cb) => {
        const allowedTypes = Object.values(contentTypeMap); // Allowed file types
        if (!allowedTypes.includes(file.mimetype)) {
          req.fileValidationError = 'Invalid file type. Allowed types: JPEG, PNG';
          return cb(null, false); // false indicates failure
        }
        cb(null, true); // Indicates success
      },
    });
  }

  createStorageEngine() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.uploadDir);
      },
      filename: (req, file, cb) => {
        const uniqueFilename = this.generateUniqueFilename(file.originalname);
        cb(null, uniqueFilename);
      },
    });
  }

  generateUniqueFilename(originalFilename) {
    const fileExt = path.extname(originalFilename);
    const uniqueName = Date.now() + '-' + Math.floor(Math.random() * 1000) + fileExt;
    return uniqueName;
  }

  getFullImageUrl(filename) {
    return `${this.baseUrl}/api_blog/uploads/${filename}`;
  }

  // New method to retrieve files
  retrieveFile(filePath, res) {
    try {
      const fileExtension = path.extname(filePath).toLowerCase();
      
      const contentType = contentTypeMap[fileExtension];

      if (!contentType) {
        return res.status(400).json({ error: 'Invalid file type' });
      }

      const fullPath = path.join(this.uploadDir, filePath);

      if (!fs.existsSync(fullPath) || !fs.lstatSync(fullPath).isFile()) {
        return res.status(404).json({ error: 'File not found' });
      }

      const stat = fs.statSync(fullPath);

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stat.size,
      });

      const readStream = fs.createReadStream(fullPath);
      readStream.pipe(res);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
  removeFile(fileName) {
    const filePath = path.join(this.uploadDir, fileName);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return;
      }
      console.log('File deleted successfully');
    });
  }
}



function getContentType(fileExtension) {
 

  return contentTypeMap[fileExtension] || 'application/octet-stream';
}

module.exports = ImageUploadManager;
