const multer = require('multer');

// Set the storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/documents/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    file.originalname = file.originalname.replace(/[^\w\s.-]/gi, '');
    cb(null, true);
};

const uploadDoc = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: fileFilter,
});

module.exports = uploadDoc;