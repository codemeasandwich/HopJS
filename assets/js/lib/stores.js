"use strict"


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!! DONT EDIT !!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//console.info("# loading stores");

var callBacks = [];

var emit = function(){
  console.log("prototype.emit")
  callBacks.forEach(function(cb){
     cb();
   })
}
  
//=====================================================
//===================================== Web Application
//=====================================================

var App = require("./../app");
var userApp = new App(emit);

var Backbone = require('backbone');
var AppData = require('./models');
//userApp.prototype.AppData = AppData;
//userApp.prototype.config = require('./../../../config/platform').platform;
  

//++++++++++++++++++++++++++++++++++++++++++ singleton
//++++++++++++++++++++++++++++++++++++++++++++++++++++

  var instance = null;
/*
  var stores = Backbone.Model.extend({
    initialize: function(){
        alert("Welcome to this world");
    },
    dispatcher : userApp.reciver
  });*/

  function MainApp(){
      if(instance !== null){
          throw new Error("Cannot instantiate more than one MainApp, use MainApp.getInstance()");
      }
      this.initialize();
  }/*
  console.log(AppData);
  console.log(AppData.prototype)

  console.log(AppData);*/
  MainApp.getInstance = function(){
      // summary:
      //      Gets an instance of the singleton. It is better to use 
      if(instance === null){
         instance = new MainApp();
      }
      return instance;
  };
  
  MainApp.prototype = {
      initialize: function(){

      this.ACTIONS    = require('./../settings/actions');
      this.MODEL      = genStoreNames(AppData.models);
      this.NAME       = genStoreNames(userApp.userStores);
      this.Dispatcher = userApp.reciver.bind(userApp);

      this.checkModelInput = AppData.checkModelInput;

      this.getData = function(modelName,where){

        if(where)
          return userApp.userStores[modelName].search(where).toJSON()

        return userApp.userStores[modelName].toJSON()
      };
            
      this.getModelDefaults = function(module){
      
        if ( ! typeof module == "string") {
          throw new Error("invalid argument supplied. module should be a string. " + typeof module + "given")
        } else if ( ! AppData.models.hasOwnProperty(module)) {
          throw new Error("invalid argument supplied. module '" + module + "' was not found.")
        }
      
        return (new AppData.models[module]()).defaults;
      };
      
      this.getModelInputs = function(module){
        if ( ! typeof module == "string") {
          throw new Error("invalid argument supplied. module should be a string. " + typeof module + "given")
        } else if ( ! AppData.attributes.hasOwnProperty(module)) {
          throw new Error("invalid argument supplied. module '" + module + "' was not found.")
        }
      
        return AppData.attributes[module];
      };

      this.onEmit = function(callBack){
        callBacks.push(callBack);
         //return bool
      };

      this.remove = function(callBack){
       
        callBacks = callBacks.filter(function(cb){
          return ! callBack === cb
        })
         //return bool
      };
      /*
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
        modules.forEach(function(moduleName){
          stores.on(moduleName,view.fluxChange)
        })
        
      },
      this.disinterestedIn = function(view, modules){
        console.log("disinterestedIn",arguments)
      }*/
    }
  }

module.exports = MainApp.getInstance();

//=====================================================
//=============================== Lib: Helper functions
//=====================================================

function genStoreNames(stores){
  //console.log("genStoreNames",stores)

  return Object.keys(stores)
      .reduce(function(previousValue, currentValue){ 
       // console.log(currentValue.toUpperCase(),previousValue);
        previousValue[currentValue.toUpperCase()] = currentValue;
        return previousValue;
      },{});
}
