var express = require('express');
var router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const { isAuthenticated, isloggedIn } = require('../middlewares/authMiddleware');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: 'Too many login attempts. Try again later.',
  handler: (req, res) => {
    req.session.error = 'Too many login attempts. Try again in 15 minutes.';
    res.redirect('/');
  }
});

/* LOGIN PAGE */
router.get('/', isloggedIn, function(req, res) {
  const error = req.session.error;
  const success = req.session.success;
  if (error) delete req.session.error;
  if (success) delete req.session.success;
  res.render('index', {
    layout: false,
    error: error || null,
    success: success || null,
    old: {},
    activeForm: 'login'
  });
});

/* REGISTER */
router.post('/register', isloggedIn, authController.register);

/* LOGIN */
router.post('/login', loginLimiter, isloggedIn, authController.login);

// /* DASHBOARD (PROTECTED ROUTE) */
// router.get('/dashboard', isAuthenticated, function(req, res) {
//   res.send(`
//     <h2>Welcome ${req.session.user.username}</h2>
//     <a href="/logout">Logout</a>
//   `);
// });

/* LOGOUT */
router.get('/logout', isAuthenticated, authController.logout);

module.exports = router;
