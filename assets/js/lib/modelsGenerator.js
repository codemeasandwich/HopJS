'use strict'
//console.info("# loading GEN models");
var Backbone = require('backbone');
var waterLine2BackBone = require('./modelsMapper');

//console.info("## loaded GEN models",module.exports);

var models = {};
var attributes = {};

//=====================================================
//=============================== Lib: Helper functions
//=====================================================

function checkModelInput(moduleName,incomingModuleData){

  if( ! moduleName){
    throw new Error("moduleName was set to " + moduleName);
  } else if( ! attributes[moduleName]){
    throw new Error("No module with the name " + moduleName + "was found");
  }

  //console.log("checkModelInput",arguments);
  var targetAttributes = attributes[moduleName];
  for(var targetAtt in targetAttributes){
    var aTargetAtt = targetAttributes[targetAtt];
    
    // skip if there no settings
    if(typeof aTargetAtt == "string"){
      continue;
    }

    // required attributes
    if(aTargetAtt.required && ! incomingModuleData.hasOwnProperty(targetAtt)){
      return { key : targetAtt, message : "missing " + targetAtt };
    }

    // test string attributes
    if("string" == aTargetAtt.type.toLowerCase()){
      if(Number.isInteger(aTargetAtt.minLength) 
      && incomingModuleData[targetAtt].length < aTargetAtt.minLength){
          return { key : targetAtt, message : "input is to short" };
      }
      if(Number.isInteger(aTargetAtt.maxLength)
      && incomingModuleData[targetAtt].length > aTargetAtt.maxLength){
          return { key : targetAtt, message : "input is to long" };
      }
    }
  }
};

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
		checkModelInput:checkModelInput
	};
}

module.exports = generator;