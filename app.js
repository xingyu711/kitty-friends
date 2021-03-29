var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(
  session({
    secret: 'secret for kitty friends web app',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

app.use('/', indexRouter);

module.exports = app;
