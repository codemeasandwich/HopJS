'use strict'

var Backbone = require('backbone');
var waterLine2BackBone = require('./mapper');

var models = {};
var attributes = {};


//=====================================================
//============================ WaterLine Model to SHARE
//=====================================================

var generator = function(serverModels){

for (var modelName in serverModels){
  models[modelName] = waterLine2BackBone(serverModels[modelName]);
  var ormAttributes = serverModels[modelName].attributes;
  
  // standardies into attribute object
  // e.g. name:'string' -> name:{type:'string'}
  for (var attribute in ormAttributes){
    if (typeof ormAttributes[attribute] == "string" ) {
      ormAttributes[attribute] = { type : ormAttributes[attribute] }
    }
  }
  
  attributes[modelName] = ormAttributes;
}

var collections = {};

for (var modelName in models){
  collections[modelName] =  Backbone.Collection.extend({
    model:models[modelName],
    url:'/'+modelName
  });
}

  
		this.models = models;
		this.collections = collections;
		this.attributes = attributes;
}

module.exports = generator;