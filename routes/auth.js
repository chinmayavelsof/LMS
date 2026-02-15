const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { isloggedIn } = require('../middlewares/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET || process.env.SESSION_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Redirect to Google
router.get('/google', isloggedIn,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback
router.get('/google/callback', isloggedIn,
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    // Mirror Passport's user into req.session.user so protected routes and views work the same as local login
    if (req.user) {
      req.session.user = { id: req.user.id, first_name: req.user.first_name, last_name: req.user.last_name, username: req.user.username };
      const token = jwt.sign(
        { id: req.user.id, username: req.user.username, first_name: req.user.first_name, last_name: req.user.last_name },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      res.cookie('auth_token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'lax' });
    }
    res.redirect('/books'); // success
  }
);

module.exports = router;
