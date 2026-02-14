const path = require('path');
const fs = require('fs');
const multer = require('multer');

const uploadDir = path.join(__dirname, '..', 'uploads', 'books');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, uploadDir),
    filename: (_, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `book_${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (_, file, cb) => {
        const ok = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype);
        cb(ok ? null : new Error('Only JPEG, JPG and PNG allowed. Max 2MB.'), ok);
    }
});

const uploadBookImage = upload.single('book_image');

const handleMulterError = (err, req, res, next) => {
    if (!err) return next();
    const msg = err.code === 'LIMIT_FILE_SIZE' ? 'File must be less than 2MB.' : (err.message || 'Invalid file.');
    res.status(400).json({ errors: { book_image: [msg] } });
};

module.exports = { uploadBookImage, handleMulterError, uploadDir };
