const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/*CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_name VARCHAR(100) NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    isbn VARCHAR(10) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL,
    modified_at DATETIME NOT NULL,
    file VARCHAR(100)
);
 */

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    book_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    author_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    file: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'books',
    timestamps: false
});

module.exports = Book;