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
var AppDB = AppData.genInstances();

//console.log("AppDB",AppDB);
var Dispatcher = require('./dispatcher');

var dispatcher = new Dispatcher(AppDB);

//++++++++++++++++++++++++++++++++ UI / pages / rouths
//++++++++++++++++++++++++++++++++++++++++++++++++++++

 var pages = require('./pages')(AppData,AppDB, dispatcher);

 