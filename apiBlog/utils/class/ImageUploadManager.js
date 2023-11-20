const multer = require('multer');
const fs = require('fs');
const path = require('path');

class ImageUploadManager {
  constructor(uploadDir, baseUrl) {
    this.uploadDir = uploadDir;
    this.baseUrl = baseUrl;
    this.initializeDirectory();
    this.upload = multer({ storage: this.createStorageEngine() });
  }

  initializeDirectory() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
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

    console.log( `${this.baseUrl}/uploads/${filename}`)
    return `${this.baseUrl}/api_blog/uploads/${filename}`;
  }

  // New method to retrieve files
  retrieveFile(filePath, res) {
    try {
      const fullPath = path.join(this.uploadDir, filePath);

      if (!fs.existsSync(fullPath) || !fs.lstatSync(fullPath).isFile()) {
        return res.status(404).json({ error: 'File not found' });
      }

      const stat = fs.statSync(fullPath);
      const fileExtension = path.extname(filePath);
      const contentType = getContentType(fileExtension);

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
}

function getContentType(fileExtension) {
  const contentTypeMap = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.pdf': 'application/pdf',
  };

  return contentTypeMap[fileExtension] || 'application/octet-stream';
}

module.exports = ImageUploadManager;
