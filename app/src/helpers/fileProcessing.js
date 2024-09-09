const multer = require('multer');

const ALLOWED_FILE_TYPES = [
    'image/jpeg', 
    'image/png', 
    'application/pdf',
    'application/msword',                 // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
  ];
  
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5 MB
// Configure multer to use memory storage
const storage = multer.memoryStorage();
module.exports = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only JPEG, PNG, PDF, DOC, and DOCX are allowed.'));
      }
      cb(null, true);
    },
    limits: {
      fileSize: MAX_FILE_SIZE
    } 
    });