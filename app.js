var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/testpage');
var nameRouter = require('./routes/name');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var menuRouter = require('./routes/menu');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// port setup
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views',express.static(__dirname + '/views'));
app.use(session({
    secret: '123!@#456$%^789&*(0)',
    resave: false,
    saveUninitialized: true
}));
app.engine('html', ejs.renderFile);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/name', nameRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/select', menuRouter);

app.get('*', function(req, res) {
   res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});