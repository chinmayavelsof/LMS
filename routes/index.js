var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

/* LOGIN PAGE */
router.get('/', function(req, res) {
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
router.post('/register', authController.register);

/* LOGIN */
router.post('/login', authController.login);

// /* DASHBOARD (PROTECTED ROUTE) */
// router.get('/dashboard', isAuthenticated, function(req, res) {
//   res.send(`
//     <h2>Welcome ${req.session.user.username}</h2>
//     <a href="/logout">Logout</a>
//   `);
// });

/* LOGOUT */
router.get('/logout', authController.logout);

module.exports = router;
