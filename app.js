//import required libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//The routers objects.
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var dataRouter = require('./routes/data');
var collectRouter = require('./routes/collect');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); //use the jade as a template engine


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Add routers to the corresponding paths.
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/data', dataRouter);
app.use('/collect', collectRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) { //TODO the forth parameter "next" was removed..
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
