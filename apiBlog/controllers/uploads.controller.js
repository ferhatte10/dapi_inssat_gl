// controllers/uploadController.js
const fs = require('fs');
const path = require('path');

// Function to generate a unique file name
const generateUniqueFileName = (originalName) => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = path.extname(originalName);
    return `${timestamp}_${randomString}${fileExtension}`;
};

const getFile = (req, res) => {
    const { userID, folderName, fileName } = req.params;

    const token_userID = req.claims.sub;
    // Verify user for files in the 'secretFiles' folder
    if (folderName === 'secretFiles' && userID !== token_userID) {
        return res.status(403).json({ error: 'Access forbidden. Not authorized.' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', userID, folderName, fileName);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
};

const getFilesPaginated = (req, res) => {
    const { userID, page } = req.params;
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;

    // Get user-specific directory
    const userDirectory = path.join(__dirname, '..', 'uploads', userID);

    // Check if the user directory exists
    if (!fs.existsSync(userDirectory)) {
        return res.status(404).json({ error: 'User directory not found' });
    }

    // Get all files in the 'publicFiles' and 'secretFiles' folders
    const publicFiles = fs.readdirSync(path.join(userDirectory, 'publicFiles'));

    // Filter and sort only public files
    const sortedPublicFiles = publicFiles
        .map((fileName) => {
            const filePath = path.join(userDirectory, 'publicFiles', fileName);
            try {
                const stats = fs.statSync(filePath);
                return { name: fileName, modifiedTime: stats.mtime };
            } catch (error) {
                console.error(`Error getting stats for file ${fileName}:`, error);
                return null;
            }
        })
        .filter(file => file !== null) // Remove files for which stats retrieval failed
        .sort((a, b) => b.modifiedTime - a.modifiedTime);
    
    // Paginate the sorted list of public files
    const paginatedPublicFiles = sortedPublicFiles.slice(offset, offset + itemsPerPage).map(file => file.name);
    
    // Return the paginated list of public files
    res.status(200).json({ files: paginatedPublicFiles });
};

const uploadFile = (req, res) => {

    const token_userID = req.claims.sub;

    
    const userID = token_userID;
    const files = req.files;

    // Check if only one file is present in the request
    if (!files || Object.keys(files).length !== 1) {
        return res.status(400).json({ error: 'Please upload exactly one file at a time.' });
    }

    const file = files.file; 

    // Check if the file size is within the allowed limit (in bytes)
    const maxFileSize = 10 * 1024 * 1024; // 10 MB (adjust as needed)
    if (file.size > maxFileSize) {
        return res.status(400).json({ error: 'File size exceeds the allowed limit.' });
    }
    
    // Create user-specific directory if not exists
    const userDirectory = path.join(__dirname, '..', 'uploads', userID);
    if (!fs.existsSync(userDirectory)) {
        fs.mkdirSync(userDirectory);
        fs.mkdirSync(path.join(userDirectory, 'publicFiles'));
        fs.mkdirSync(path.join(userDirectory, 'secretFiles'));
    }

    // Determine destination folder based on the file type
    const folderName = file.mimetype === 'application/pdf' ? 'secretFiles' : 'publicFiles';

    // Generate a unique file name
    const uniqueFileName = generateUniqueFileName(file.name);

    const uploadPath = path.join(userDirectory, folderName, uniqueFileName);

    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error uploading file' });
        }

        // Return the URL of the uploaded file
        const fileURL = `/api_blog/uploads/${userID}/${folderName}/${uniqueFileName}`;

        res.status(200).json({ message: 'File uploaded successfully', fileURL, fileName: uniqueFileName});
    });
};


const getDefaultFile = (req, res) => { 
    const fileName = req.params.fileName; // Extract the file name from the request parameters
    const filePath = path.join(__dirname, '..', 'uploads', 'default', fileName);
  
    // The 'express.static' middleware will handle serving the file
    res.sendFile(filePath);
  };

module.exports = {
    getFilesPaginated,
    getFile,
    uploadFile,
    getDefaultFile
};
