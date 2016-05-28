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
  models[modelName] = waterLine2BackBone(modelName, serverModels[modelName]);
  var ormAttributes = serverModels[modelName].attributes;
  
  // standardies into attribute object
  // e.g. name:'string' -> name:{type:'string'}
  for (var attribute in ormAttributes){
    if (typeof ormAttributes[attribute] == "string" ) {
      ormAttributes[attribute] = { type : ormAttributes[attribute] }
    }
    
    if ('undefined' === typeof ormAttributes[attribute].type) {
      console.warn("Unhandled attribute:"+attribute+" in "+modelName);
      continue;
    }
    
    ormAttributes[attribute].type = ormAttributes[attribute].type.toLowerCase();
    
    if("datetime" === ormAttributes[attribute].type){
      ormAttributes[attribute].type = "date";
    }
    if ("boolean" === ormAttributes[attribute].type) {
      ormAttributes[attribute].type = "checkbox";
    }
    
  }
  
  
  attributes[modelName] = ormAttributes;
}

var collections = {};

for (var modelName in models){
  collections[modelName] =  Backbone.Collection.extend({
    model:models[modelName],
    url:modelName
  });
}
//console.log(">>>>",collections);
  
		this.models = models;
		this.collections = collections;
		this.attributes = attributes;
}

module.exports = generator;