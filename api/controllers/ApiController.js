"use strict"

var logger = require('tracer').colorConsole();

module.exports = {

	index:function(req, res){
    logger.log(req.param('model'))
    res.ok();
  },
}