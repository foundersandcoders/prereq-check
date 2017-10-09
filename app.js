const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const cookieSession = require('cookie-session');

const router = require('./routes/index');

require('env2')('config.json');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const layoutsDir = path.join(__dirname, 'views', 'layouts');
app.engine('hbs', exphbs({
  extname: 'hbs',
  layoutsDir,
  partialsDir: path.join(__dirname, 'views', 'partials'),
  defaultLayout: 'main',
}));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieSession({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
