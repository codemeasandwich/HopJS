"use strict"


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!! DONT EDIT !!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var Backbone = require('backbone');
var AppData  = require('./models');  

//++++++++++++++++++++++++++++++++++++++++++ singleton
//++++++++++++++++++++++++++++++++++++++++++++++++++++

  var instance = null;

  function MainApp(){
      if(null !== instance){
          throw new Error("Cannot instantiate more than one MainApp, use MainApp.getInstance()");
      }
      this.initialize();
  }
  
  MainApp.getInstance = function(){
      // summary:   Gets an instance of the singleton. It is better to use 
      if(null === instance){
         instance = new MainApp();
      }
      return instance;
  };
  
  MainApp.prototype = {
    initialize: function(){

      this.MODEL = genStoreNames(AppData.models);

      this.checkModelInput = AppData.checkModelInput;
/*
      this.getData = function(modelName,where){

        if(where)
          return userApp.userStores[modelName].search(where).toJSON()

        return userApp.userStores[modelName].toJSON()
      };
*/   
      this.getModelDefaults = function(module){
      
        if ( "string" !== typeof module) {
          throw new Error("invalid argument supplied. module should be a string. "
                          + typeof module + "given")
        } else if ( ! AppData.models.hasOwnProperty(module)) {
          throw new Error("invalid argument supplied. module '" + module + "' was not found.")
        }
      
        return (new AppData.models[module]()).defaults;
      }; // END getModelDefaults
      
      this.getModelInputs = function(module){
        console.count("getModelInputs");
        if ("string" !== typeof module) {
          throw new Error("invalid argument supplied. module should be a string. "
                          + typeof module + " given")
        } else if ( ! AppData.attributes.hasOwnProperty(module)) {
          console.error(module,new Error().stack);
         
          throw new Error("invalid argument supplied. module '" + module + "' was not found.")
        }
      
        return AppData.attributes[module];
      };// END getModelInputs

    }// END initialize
  }

module.exports = MainApp.getInstance();

//=====================================================
//=============================== Lib: Helper functions
//=====================================================

function genStoreNames(stores){

  return Object.keys(stores)
      .reduce(function(previousValue, currentValue){ 
        previousValue[currentValue.toUpperCase()] = currentValue;
        return previousValue;
      },{});
}
