"use strict"

var logger = require('tracer').colorConsole();

module.exports = function(req, res, next) {
  console.info(req.path);
  next();
}