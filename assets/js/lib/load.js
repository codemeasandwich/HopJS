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
var AppDB = {}

for (var collectionName in AppData.collections) {
  AppDB[collectionName] = new AppData.collections[collectionName]();
}

var Dispatcher = require('./dispatcher');

var dispatcher = new Dispatcher(AppData);


//++++++++++++++++++++++++++++++++ UI / pages / rouths
//++++++++++++++++++++++++++++++++++++++++++++++++++++

 var pages = require('./pages')(AppData, dispatcher);

 