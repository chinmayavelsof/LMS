const path = require('path');
const fs = require('fs');
const bookService = require('../services/bookService');
const emailService = require('../services/emailService');
const { uploadDir } = require('../middlewares/uploadMiddleware');

const validateBookBody = (body) => {
    const errors = {};
    const name = String(body?.book_name ?? '').trim();
    const author = String(body?.author_name ?? '').trim();
    const isbn = String(body?.isbn ?? '').trim();
    if (!name) errors.book_name = ['Book name is required'];
    else if (name.length > 255) errors.book_name = ['Book name must be at most 255 characters'];
    if (!author) errors.author_name = ['Author name is required'];
    else if (author.length > 255) errors.author_name = ['Author name must be at most 255 characters'];
    if (!isbn) errors.isbn = ['ISBN is required'];
    else if (isbn.length > 8) errors.isbn = ['ISBN must be at most 8 characters'];
    return errors;
};

const isAjax = (req) => req.xhr || (req.get('Accept') && req.get('Accept').includes('application/json'));

const isValidBookId = (id) => {
    const n = parseInt(id, 10);
    return Number.isInteger(n) && n > 0;
};

// Get all books with server-side pagination
exports.getAllBooks = async (req, res) => {
    try {
        let page = parseInt(req.query.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || parseInt(process.env.PAGE_SIZE, 10) || 10;
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        if (limit > 100) limit = 100;
        const { totalBooks, totalPages, currentPage, books } = await bookService.getAllBooks(page, limit);
        const error = req.session.error;
        const success = req.session.success;
        if (error) delete req.session.error;
        if (success) delete req.session.success;
        res.render('book_list', {
            books,
            totalBooks,
            totalPages,
            currentPage,
            limit,
            success,
            error
        });
    } catch (error) {
        return res.render('book_list', {
            books: [],
            totalBooks: 0,
            totalPages: 0,
            currentPage: 1,
            limit: 10,
            success: null,
            error: error.message || 'Failed to load books.'
        });
    }
};

// Add a new book
exports.addBook = async (req, res) => {
    try {
        const validationErrors = validateBookBody(req.body);
        if (Object.keys(validationErrors).length > 0) {
            if (isAjax(req)) return res.status(400).json({ errors: validationErrors });
            return res.render('add_book', {
                action: 'add',
                old: req.body || {},
                errors: validationErrors
            });
        }
        const { book_name, author_name, isbn } = req.body;
        const payload = {
            book_name: String(book_name ?? '').trim(),
            author_name: String(author_name ?? '').trim(),
            isbn: String(isbn ?? '').trim()
        };
        if (req.file && req.file.filename) payload.file = req.file.filename;
        const book = await bookService.createBook(payload);
        const attachmentPath = req.file && req.file.path;
        await emailService.sendBookAddedEmail(book, attachmentPath);
        req.session.success = 'Book added successfully';
        if (isAjax(req)) return res.status(200).json({ success: true, redirect: '/books' });
        res.redirect('/books');
    } catch (error) {
        const errors = {};
        if (error.name === 'SequelizeUniqueConstraintError' && error.errors) {
            const isbnErr = error.errors.find(e => e.path === 'isbn');
            if (isbnErr) errors.isbn = ['ISBN already exists'];
            else errors.isbn = ['This value is already in use'];
        } else {
            errors._general = [error.message];
        }
        if (isAjax(req)) return res.status(400).json({ errors });
        return res.render('add_book', {
            action: 'add',
            old: req.body || {},
            errors
        });
    }
};
// Add/edit book form
exports.addBookForm = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.render('add_book', {
                action: 'add',
                old: {},
                errors: {}
            });
        }
        if (!isValidBookId(id)) {
            req.session.error = 'Invalid book ID';
            return res.redirect('/books');
        }
        const book = await bookService.getBookById(id);
        if (!book) {
            req.session.error = 'Something went wrong: No book found';
            return res.redirect('/books');
        } else {
            return res.render('add_book', {
                action: 'edit',
                old: book,
                errors: {}
            });
        }
    } catch (error) {
        return res.render('add_book', {
            action: 'add',
            old: {},
            errors: error.message
        });
    }
};

// Update a book (called from edit form POST)
exports.updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isValidBookId(id)) {
            req.session.error = 'Invalid book ID';
            if (isAjax(req)) return res.status(400).json({ errors: { _general: ['Invalid book ID'] } });
            return res.redirect('/books');
        }
        const validationErrors = validateBookBody(req.body);
        if (Object.keys(validationErrors).length > 0) {
            if (isAjax(req)) return res.status(400).json({ errors: validationErrors });
            return res.render('add_book', {
                action: 'edit',
                old: { ...req.body, id },
                errors: validationErrors
            });
        }
        const data = {
            book_name: req.body.book_name,
            author_name: req.body.author_name,
            isbn: req.body.isbn
        };
        if (req.file && req.file.filename) {
            const existing = await bookService.getBookById(id);
            if (existing && existing.file) {
                const oldPath = path.join(uploadDir, existing.file);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            data.file = req.file.filename;
        }
        await bookService.updateBook(id, data);
        req.session.success = 'Book updated successfully';
        if (isAjax(req)) return res.status(200).json({ success: true, redirect: '/books' });
        res.redirect('/books');
    } catch (error) {
        const errors = {};
        if (error.name === 'SequelizeUniqueConstraintError' && error.errors) {
            const isbnErr = error.errors.find(e => e.path === 'isbn');
            if (isbnErr) errors.isbn = ['ISBN already exists'];
            else errors.isbn = ['This value is already in use'];
        } else {
            errors._general = [error.message];
        }
        if (isAjax(req)) return res.status(400).json({ errors });
        return res.render('add_book', {
            action: 'edit',
            old: { ...req.body, id: req.params.id },
            errors
        });
    }
};

// Serve book image (inline for display in listing)
exports.getBookImage = async (req, res) => {
    try {
        const id = req.params.id;
        const asAttachment = req.query.download === '1';
        if (!isValidBookId(id)) return res.status(404).end();
        const book = await bookService.getBookById(id);
        if (!book || !book.file) return res.status(404).end();
        const filePath = path.join(uploadDir, book.file);
        if (!fs.existsSync(filePath)) return res.status(404).end();
        const ext = path.extname(book.file).toLowerCase();
        const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';
        res.setHeader('Content-Type', contentType);
        if (asAttachment) {
            res.setHeader('Content-Disposition', `attachment; filename="book-${book.id}-cover${ext}"`);
        }
        res.sendFile(path.resolve(filePath));
    } catch (err) {
        res.status(500).end();
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isValidBookId(id)) {
            req.session.error = 'Invalid book ID';
            return res.redirect('/books');
        }
        await bookService.deleteBook(id);
        req.session.success = 'Book deleted successfully';
        res.redirect('/books');
    } catch (error) {
        req.session.error = 'Something went wrong';
        return res.redirect('/books');
    }
};
