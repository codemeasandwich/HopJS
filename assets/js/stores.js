"use strict"

var config = require('./../../../config/platform').platform;


var MODELS = require('./models');
console.log("MODELS",MODELS);
console.log("user",new MODELS.User());
//=====================================================
//===================================== Web Application
//=====================================================
 
var construtor = function(){
  
  //var users
  
  //this.getUsers
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
          instance = new MainApp();
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

