"use strict"

var logger = require('tracer').colorConsole();

module.exports = {

	index:function(req, res){
    res.view('index');
  },
}