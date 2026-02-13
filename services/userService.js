const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    return await User.create(data);
};

const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

const getUserByUsername = async (username) => {
    return await User.findOne({ where: { username } });
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserByUsername
};
