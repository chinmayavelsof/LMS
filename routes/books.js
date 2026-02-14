const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { uploadBookImage, handleMulterError } = require('../middlewares/uploadMiddleware');
const bookController = require('../controllers/bookController');

router.get('/add_books', isAuthenticated, bookController.addBookForm);

router.get('/', isAuthenticated, bookController.getAllBooks);

router.post('/', isAuthenticated, uploadBookImage, handleMulterError, bookController.addBook);

router.get('/add_books/:id', isAuthenticated, bookController.addBookForm);

router.get('/delete/:id', isAuthenticated, bookController.deleteBook);

router.post('/:id', isAuthenticated, uploadBookImage, handleMulterError, bookController.updateBook);

router.get('/image/:id', isAuthenticated, bookController.getBookImage);

module.exports = router;
