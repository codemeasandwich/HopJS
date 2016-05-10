'use strict'

var path = require('path');

var req = require.context("../../../../api/models", true, /\.js$/);

// an array of all files in folder
var fileNames = req.keys();

var serverModels = {};

for (var name in fileNames) {
  if (fileNames.hasOwnProperty(name)) {
    var model = req(fileNames[name]);

    if (model.hop) {
      var modelName = path.basename(fileNames[name], '.js')
      serverModels[modelName] = model;
    }
  }
}

module.exports = serverModels;