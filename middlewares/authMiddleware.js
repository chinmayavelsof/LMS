exports.isAuthenticated = (req, res, next) => {
    // Support both local login (req.session.user) and OAuth (req.user from Passport)
    if (req.session.user || (req.user && req.isAuthenticated && req.isAuthenticated())) {
        next();
    } else {
        return res.redirect('/');
    }
};
exports.isloggedIn = (req, res, next) => {
    if (!(req.session.user || (req.user && req.isAuthenticated && req.isAuthenticated()))) {
        next();
    } else {
        return res.redirect('/books');
    }
};