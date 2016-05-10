'use strict'
//console.info("# loading GEN models");
var Backbone = require('backbone');
var waterLine2BackBone = require('./mapper');

//console.info("## loaded GEN models",module.exports);

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
//console.log(">>models",models)

var collections = {};

for (var modelName in models){
  collections[modelName] =  Backbone.Collection.extend({
    model:models[modelName],
    url:'/'+modelName
  });
}

//console.log(">>collections",collections)

 return { 
		models:models, 
		collections:collections, 
		attributes:attributes, 
		//checkModelInput:checkModelInput,
    //getModelInputs:getModelInputs,
    //getModelDefaults:getModelDefaults
	};
}

module.exports = generator;