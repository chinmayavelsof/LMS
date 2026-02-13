const express = require('express');
const passport = require('passport');
const router = express.Router();

// Redirect to Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    // Mirror Passport's user into req.session.user so protected routes and views work the same as local login
    if (req.user) {
      console.log(req.user);
      req.session.user = { id: req.user.id, first_name: req.user.first_name, last_name: req.user.last_name, username: req.user.username };
    }
    res.redirect('/books'); // success
  }
);

module.exports = router;
