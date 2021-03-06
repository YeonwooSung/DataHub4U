//import required libraries
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


//The routers objects.
let indexRouter = require('./routes/index');
let userRouter = require('./routes/users');
let dataRouter = require('./routes/data');
let collectRouter = require('./routes/collect');
let loginRouter = require('./routes/login');
let registerRouter = require('./routes/register');
let publicRouter = require('./publicRouter');
let purchaseRouter = require('./routes/purchase');


//the middleware object
let app = express();


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
app.use('/public', publicRouter);
app.use('/purchase', purchaseRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
