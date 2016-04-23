"use strict"

var logger = require('tracer').colorConsole();

module.exports = function(req, res, next) {
  
  var socket = (req.socket)?"*":"";
  
  console.info(req.method + socket + ": " + req.path + " ~ "+req.acceptedLanguages);
  next();
}