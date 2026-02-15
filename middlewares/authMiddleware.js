const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || process.env.SESSION_SECRET;

exports.authenticateJWT = (req, res, next) => {
    const token = req.cookies?.auth_token || (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer' && req.headers.authorization.split(' ')[1]);
    if (!token) return next();
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { id: decoded.id, username: decoded.username, first_name: decoded.first_name, last_name: decoded.last_name };
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

exports.isAuthenticated = (req, res, next) => {
    // Support session (req.session.user), Passport (req.user), or JWT (req.user set by authenticateJWT)
    if (req.session?.user || (req.user && (req.isAuthenticated ? req.isAuthenticated() : true))) {
        next();
    } else {
        if (req.xhr || (req.get('Accept') && req.get('Accept').includes('application/json'))) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        return res.redirect('/');
    }
};

exports.isloggedIn = (req, res, next) => {
    if (!(req.session?.user || (req.user && (req.isAuthenticated ? req.isAuthenticated() : true)))) {
        next();
    } else {
        return res.redirect('/books');
    }
};