'use strict'

var Backbone = require('backbone');
var path = require('path');
var modelsGenerator = require('./modelsGenerator');


var req = require.context("../../../api/models", true, /\.js$/);
//console.log(" req ",req)
// an array of all files in folder
var fileNames = req.keys();

var serverModels = {};

for (var name in fileNames) {
  if (fileNames.hasOwnProperty(name)) {
    var model = req(fileNames[name]);
    //console.log(" § ",model);
    if (model.hop) {
      var modelName = path.basename(fileNames[name], '.js')
      serverModels[modelName] = model;
    }
  }
}

//console.log(" µ serverModels",serverModels);



//var serverModels    = require("./../wiring/models");

var AppOrm = modelsGenerator(serverModels);
  var instances = null;

//window.AppDB = AppDB;
function onAppDataChange(toBind,callBack) {
  //console.log("onAppDataChange",callBack);
  if ( ! instances) {
    console.error("genInstances needs to be called before binding events");
    AppOrm.genInstances();
  }
  //TODO: //if(config.development && "boolean" !== typeof toBind) {
  if ("boolean" !== typeof toBind) {
    throw new Error(`InvalidArgumentException: first argument must be a 'boolean'. ${typeof toBind} was passed`);
  }
  
    var bind = (toBind)?"bind":"unbind";
    for (var collectionName in AppOrm.collections) {
      instances[collectionName][bind]("all", callBack);
/*      
    "add" (model, collection, options) — when a model is added to a collection.
    "remove" (model, collection, options) — when a model is removed from a collection.
    "update" (collection, options) — single event triggered after any number of models have been added or removed from a collection.
    "reset" (collection, options) — when the collection's entire contents have been reset.
    "sort" (collection, options) — when the collection has been re-sorted.
    "change" (model, options) — when a model's attributes have changed.
    "change:[attribute]" (model, value, options) — when a specific attribute has been updated.
    "destroy" (model, collection, options) — when a model is destroyed.
    "request" (model_or_collection, xhr, options) — when a model or collection has started a request to the server.
    "sync" (model_or_collection, response, options) — when a model or collection has been successfully synced with the server.
    "error" (model_or_collection, response, options) — when a model's or collection's request to the server has failed.
    "invalid" (model, error, options) — when a model's validation fails on the client.
    "route:[name]" (params) — Fired by the router when a specific route is matched.
    "route" (route, params) — Fired by the router when any route has been matched.
    "route" (router, route, params) — Fired by history when any route has been matched.
    "all" — this special event fires for any triggered event, passing the event name as the first argument followed by all trigger arguments.
*/
      
    }
}



  //addOnChange
  AppOrm.bind = function(callBack){
    //console.log(" -+- addOnChange",callBack);
    onAppDataChange(true,callBack);
  };
  //removeOnChange
  AppOrm.unbind = function(callBack){
    onAppDataChange(false,callBack);
  };
  
  AppOrm.genInstances = function(){
    if ( ! instances) {
      instances = {};
      for (var collectionName in AppOrm.collections) {
      /*  if (AppDB.hasOwnProperty(collectionName)) {
          throw new Error(`PropertyDuplicationException: ${collectionName} is already in use`);
        }*/
        instances[collectionName] = new AppOrm.collections[collectionName]();
      }
    } else {
      console.warn("genInstances should only be called once!");
    }
    return instances;
  }


module.exports = AppOrm;

//=====================================================
//=============================== Backbone Model update
//=====================================================

  Backbone.Model.prototype.update = function (key, val, options) {
    
    if (undefined === val) {
      console.warn("You are setting undefined as a value!");
    }
    
    options = options || {};
    options.validate = options.validate || true;
    options.key = key;
    return !!this.set(key, val, options);
  };
