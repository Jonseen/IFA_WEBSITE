const multer = require('multer');

// Set the storage engine for multer
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-image-${file.originalname}`);
    },
});

let fileFilter = (req, file, cb) => {
    file.originalname = file.originalname.replace(/[^\w\s.-]/gi, '');
    cb(null, true);
};
  
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: fileFilter
}).array('files', 5);

module.exports = upload;