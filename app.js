'use strict';

const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3000;
const jsonParser = require('body-parser').json;
const logger = require('morgan');

app.use(logger("dev"));
app.use(jsonParser());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/qa');

const db = mongoose.connection;

db.on('error', function(err){
  console.error("connection error:",err);
});

db.once('open', function(){
  console.log('Database connection successful');
});
app.use('/questions', routes);

// catch 404 and forward to error handler
app.use(function(req,res,next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

//Error handler
app.use(function(err,req,res,next){
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

app.listen(port, function(){
  console.log('Express server is listening on port', port);
});
