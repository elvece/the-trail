// *** databases *** //
require('./models/hike');
require('./models/stream');

// seed the database
// var seedDatabase = require('./models/seed');
// seedDatabase();

// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');



// *** config file *** //
var config = require('../../_config');

// *** routes *** //
var routes = require('./routes/index.js');
var hikes = require('./routes/hikes.js');
var geoShare = require('./routes/stream.js');

// *** express instance *** //
var app = express();

// *** attach socket.io to the app *** //
var io = require('socket.io')();
app.io = io;
require('./socket')(io);

// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));

// *** view routes *** //
app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../client/public/views/', 'layout.html'));
});

// *** main routes *** //
app.use('/', routes);
app.use('/hikes', hikes);
app.use('/geo-share', geoShare);

// *** mongoose *** //
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
