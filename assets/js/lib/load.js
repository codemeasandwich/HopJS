"user strict";
//=====================================================
//=============== >> The enrty point << ===============
//=====================> webpack <=====================

 require('./bootstrap');
 
//=====================================================
//======================================= Setup the app
//=====================================================

//++++++++++++++++++++++++++++++++++ initialise stores
//++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
var AppData = require('./lib/models');

var modelNames = Object.keys(AppData.collections);

var stores = modelNames.reduce(function(data,name){
  data[name] = new AppData.collections[name]();
  return data;
},{});
*/
//+++++++++++++++++++++++++++++ dispatcher / app logic
//++++++++++++++++++++++++++++++++++++++++++++++++++++


var AppData = require('./models');
var AppDB = {};
//window.AppDB = AppDB;
function onAppDataChange(toBind,callBack) {
  console.log("onAppDataChange",callBack);
  //TODO: //if(config.development && "boolean" !== typeof toBind) {
  if ("boolean" !== typeof toBind) {
    throw new Error(`InvalidArgumentException: first argument must be a 'boolean'. ${typeof toBind} was passed`);
  }
  
    var bind = (toBind)?"bind":"unbind";
    for (var collectionName in AppData.collections) {
      AppDB[collectionName][bind]("all", callBack);
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
  AppData.bind = function(callBack){
    //console.log(" -+- addOnChange",callBack);
    onAppDataChange(true,callBack);
  };
  //removeOnChange
  AppData.unbind = function(callBack){
    onAppDataChange(false,callBack);
  };

for (var collectionName in AppData.collections) {
/*  if (AppDB.hasOwnProperty(collectionName)) {
    throw new Error(`PropertyDuplicationException: ${collectionName} is already in use`);
  }*/
  AppDB[collectionName] = new AppData.collections[collectionName]();
}


console.log("AppDB",AppDB);
var Dispatcher = require('./dispatcher');

var dispatcher = new Dispatcher(AppDB);


//++++++++++++++++++++++++++++++++ UI / pages / rouths
//++++++++++++++++++++++++++++++++++++++++++++++++++++

 var pages = require('./pages')(AppData,AppDB, dispatcher);

 