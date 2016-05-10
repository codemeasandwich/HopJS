'use strict'


//=====================================================
//=============================== Lib: Helper functions
//=====================================================

module.exports = function(backboneModels){
  
  var attributes = backboneModels.attributes;
  var models = backboneModels.models;
  
//++++++++++++++++++++++++++++++++++ Check Model Input
//++++++++++++++++++++++++++++++++++++++++++++++++++++

 this.checkModelInput = function(moduleName,incomingModuleData){
  
    if( ! moduleName){
      throw new Error("moduleName was set to " + moduleName);
    } else if( ! attributes[moduleName]){
      throw new Error("No module with the name " + moduleName + "was found");
    }  
    
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
  
//+++++++++++++++++++++++++++++++++++ Get Model Inputs
//++++++++++++++++++++++++++++++++++++++++++++++++++++

  
  this.getModelInputs = function  (module){

    if ("string" !== typeof module) {
      throw new Error("invalid argument supplied. module should be a string. "
                      + typeof module + " given")
    } else if ( ! attributes.hasOwnProperty(module)) {
      //console.error(module,new Error().stack);
      throw new Error("invalid argument supplied. module '" + module + "' was not found.")
    }
  
    return attributes[module];
  };// END getModelInputs
  
//+++++++++++++++++++++++++++++++++++ Get Model Inputs
//++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  this.getModelDefaults = function (module){
  
    if ( "string" !== typeof module) {
      throw new Error("invalid argument supplied. module should be a string. "
                      + typeof module + "given")
    } else if ( ! models.hasOwnProperty(module)) {
      throw new Error("invalid argument supplied. module '" + module + "' was not found.")
    }
  
    return (new models[module]()).defaults;
  }; // END getModelDefaults
  
  
//++++++++++++++++++++++++++++++++++++ Get Model Names
//++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  this.getNames = function(){
  
    return Object.keys(models)
        .reduce(function(previousValue, currentValue){ 
          previousValue[currentValue.toUpperCase()] = currentValue;
          return previousValue;
        },{});
  }; // END getNames
  
};