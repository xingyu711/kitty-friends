var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config(); //call dotenv to load variables from the .env file

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
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.aijdj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      ttl: 3 * 24 * 60 * 60, // session expires in 3 days
    }),
  })
);

app.use('/', indexRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('frontend', 'build', 'index.html'));
});

module.exports = app;
