const Book = require('../models/Book');

const createBook = async (data) => {
    return await Book.create(data); // Create a new book
};

const getBookById = async (id) => {
    return await Book.findByPk(id); // Get a book by its id
};

const updateBook = async (id, data) => {
    return await Book.update(data, { where: { id } }); // Update a book by its id
};

const deleteBook = async (id) => {
    return await Book.destroy({ where: { id } }); // Delete a book by its id
};

const getAllBooks = async (page = 1, limit = 4) => {
    const offset = (page - 1) * limit;
    const { count, rows } = await Book.findAndCountAll({
        offset,
        limit,
        order: [['created_at', 'DESC']]
    });
    return {
        totalBooks: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        books: rows
    };
};

module.exports = {
    createBook,
    getBookById,
    updateBook,
    deleteBook,
    getAllBooks
};