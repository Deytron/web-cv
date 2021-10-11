var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var hbs = require('express-hbs');
var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const redis = require('redis')

// Redis
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

// Fichier dans le dossier routes
var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blog');
var secretRouter = require('./routes/secret');
var insertRouter = require('./routes/insert');
var logoutRouter = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views',
  defaultLayout: "views/layout",
  extname: '.hbs'
}));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'favicons')));
app.use(express.static(path.join(__dirname, 'style')));
app.use(express.static(path.join(__dirname, 'node_modules/bulma/css/')));
app.use(express.static(path.join(__dirname, 'article_img')));
app.use(express.static(path.join(__dirname, 'article_md')));

// Express Session + stockage in Redis
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: Math.random().toString(36).substring(2),
  saveUninitialized: true,
  httpOnly: true,
  resave: false,
  secure: true
}));

// Routes to use
app.use('/', indexRouter);
app.use('/blog', blogRouter);
app.use('/supersecretlogin', secretRouter);
app.use('/insert', insertRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(500);
  // res.render('error');

  // render 404
  res.status(404)
  res.render('404', { title: "Oups !" });
});

module.exports = app;
