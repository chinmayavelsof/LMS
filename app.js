require('dotenv').config();
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('./config/passport');
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const db = require('./config/db');


const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);

// Set default layout file
app.set('layout', 'layouts/main'); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'lms-secret-key-dev',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Expose current user to all views (for header/sidebar; supports local login and Passport)
app.use((req, res, next) => {
  res.locals.user = req.session?.user || (req.user && { id: req.user.id, username: req.user.username }) || null;
  next();
});

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/auth', require('./routes/auth'));


// 404
app.use((req, res, next) => {
  res.status(404).send('404 - Page Not Found');
});

async function start() {
  try {
    await db.authenticate();
    console.log('Connected to MySQL (Sequelize)');
    app.listen(process.env.PORT, () => console.log('Server running on port 3000'));
  } catch (err) {
    console.error('Unable to start:', err.message);
    process.exit(1);
  }
}

start();
