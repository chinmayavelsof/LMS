const bcrypt = require('bcrypt');
const userService = require('../services/userService');

const validateRegister = (body) => {
    const errors = [];
    if (!body.first_name || String(body.first_name).trim() === '') errors.push('First name is required');
    if (!body.last_name || String(body.last_name).trim() === '') errors.push('Last name is required');
    if (!body.email || String(body.email).trim() === '') errors.push('Email is required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email).trim())) errors.push('Email must be a valid format');
    if (!body.username || String(body.username).trim() === '') errors.push('Username is required');
    if (!body.password || String(body.password) === '') errors.push('Password is required');
    else if (String(body.password).length < 6 || String(body.password).length > 20) errors.push('Password must be between 6 and 20 characters');
    return errors;
};

const validateLogin = (body) => {
    const errors = [];
    if (!body.username || String(body.username).trim() === '') errors.push('Username is required');
    if (!body.password || String(body.password) === '') errors.push('Password is required');
    return errors;
};

// REGISTER
exports.register = async (req, res) => {
    try {
        const validationErrors = validateRegister(req.body);
        if (validationErrors.length) {
            return res.render('index', {
                layout: false,
                error: validationErrors.join('; '),
                old: req.body,
                activeForm: 'register'
            });
        }

        const email = String(req.body.email).trim();
        const username = String(req.body.username).trim();

        let existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            return res.render('index', {
                layout: false,
                error: "Email already exists",
                old: req.body,
                activeForm: 'register'
            });
        }

        existingUser = await userService.getUserByUsername(username);
        if (existingUser) {
            return res.render('index', {
                layout: false,
                error: "Username already exists",
                old: req.body,
                activeForm: 'register'
            });
        }

        const { first_name, middle_name, last_name, password } = req.body;
        await userService.createUser({
            first_name: String(first_name || '').trim(),
            middle_name: middle_name != null ? String(middle_name).trim() : null,
            last_name: String(last_name || '').trim(),
            email,
            username,
            password
        });

        return res.render('index', {
            layout: false,
            success: "Registration successful! Please login.",
            old: {},
            activeForm: 'login'
        });D:\Node JS Training\Day 4\Library_management_system\controllers\authController.js

    } catch (error) {
        return res.render('index', {
            layout: false,
            error: error.message,
            old: req.body,
            activeForm: 'register'
        });
    }
};



// LOGIN
exports.login = async (req, res) => {
    try {
        const validationErrors = validateLogin(req.body);
        if (validationErrors.length) {
            return res.render('index', {
                layout: false,
                error: validationErrors.join('; '),
                old: req.body,
                activeForm: 'login'
            });
        }

        const username = String(req.body.username).trim();
        const password = String(req.body.password).trim();
        const user = await userService.getUserByUsername(username);
        if (!user) {
            return res.render('index', {
                layout: false,
                error: "Invalid username or password",
                old: req.body,
                activeForm: 'login'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('index', {
                layout: false,
                error: "Invalid username or password",
                old: req.body,
                activeForm: 'login'
            });
        }
        console.log(user);

        req.session.user = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username
        };

        res.redirect('/books');

    } catch (error) {
        return res.render('index', {
            layout: false,
            error: error.message,
            old: req.body,
            activeForm: 'login'
        });
    }
};



// LOGOUT
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
