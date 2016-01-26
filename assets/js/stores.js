"use strict"
console.info("# loading stores");

//=====================================================
//===================================== Web Application
//=====================================================
 
var construtor = function(config, MODELS){
  
  //var users
  
  //this.getUsers
  
 // this.getModule
  
  this.interestedIn = function(view, modules){
    
    if (typeof modules == "string") {
      modules = [modules];
    } else if ( ! Array.isArray(modules)) {
      throw new Error("invalid argument supplied. modules should be a string or array. " + typeof modules + "given")
    } else if ( ! typeof view == "object") {
      throw new Error("invalid argument supplied. view should be a object. " + typeof view + "given")
    } else if ( ! typeof view.fluxChange == "function") {
      throw new Error("view is missing 'fluxChange' function")
    }
    
    console.log("interestedIn",arguments)
  }
  this.disinterestedIn = function(view, modules){
    console.log("disinterestedIn",arguments)
  }
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!! DONT EDIT !!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


//++++++++++++++++++++++++++++++++++++++++++ singleton
//++++++++++++++++++++++++++++++++++++++++++++++++++++

  var instance = null;

  function MainApp(){
      if(instance !== null){
          throw new Error("Cannot instantiate more than one MainApp, use MainApp.getInstance()");
      } 
      this.initialize();
  }
  
  MainApp.getInstance = function(){
      // summary:
      //      Gets an instance of the singleton. It is better to use 
      if(instance === null){
         var MODELS = require('./lib/models');
         var config = require('./../../config/platform').platform;
         instance = new MainApp(config,MODELS);
      }
      return instance;
  };
    
//=====================================================
//================================= Main App Definition
//=====================================================

  MainApp.prototype = {
      initialize: construtor
  }

module.exports = MainApp.getInstance();

console.info("## loaded stores",module.exports);
