const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    first_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'First name is required' }
        }
    },

    middle_name: {
        type: DataTypes.STRING(45),
        allowNull: true
    },

    last_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Last name is required' }
        }
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'Invalid email format' },
            notEmpty: { msg: 'Email is required' }
        }
    },

    username: {
        type: DataTypes.STRING(45),
        allowNull: true,  // null for OAuth-only users (e.g. Google sign-in)
        unique: true,
        validate: {
            notEmptyIfPresent(value) {
                if (value != null && String(value).trim() === '') {
                    throw new Error('Username is required');
                }
            }
        }
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: true,  // null for OAuth-only users (e.g. Google sign-in)
        validate: {
            notEmptyIfPresent(value) {
                if (value != null && String(value).trim() === '') {
                    throw new Error('Password is required');
                }
            }
        }
    },

    google_id: {
    type: DataTypes.STRING,
    allowNull: true
  },

    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;
