"user strict";

  console.log(" +-+-+-+-+-+ ");
  console.log(" |H|o|p|J|s| ");
  console.log(" +-+-+-+-+-+ ");

//=====================================================
//=============== >> The enrty point << ===============
//=====================> webpack <=====================

 var extesionNames = require('../../../config/languageExtensions').init();
 
 console.info("extesions loaded",extesionNames);
 
//=====================================================
//============================================ template
//=====================================================

//++++++++++++++++++++++++++++++++++ initialise stores
//++++++++++++++++++++++++++++++++++++++++++++++++++++

var waterLineModels = require('./template/files');
                      require('./template/addons');

var Generator = require('./template/generator');
var backboneModels = new Generator(waterLineModels);
    
var Helpers = require('./template/helpers');
var modelHelpers = new Helpers(backboneModels);
    
var Instance = require('./template/instance');
var clientSideLiveData = new Instance(backboneModels.collections);

var Emit = require('./template/emit')
var UnderlyingChange = new Emit(clientSideLiveData);

//+++++++++++++++++++++++++++++ dispatcher / app logic
//++++++++++++++++++++++++++++++++++++++++++++++++++++

var Dispatcher = require('./dispatcher');

var dispatcher = new Dispatcher(clientSideLiveData);

//++++++++++++++++++++++++++++++++ UI / pages / rouths
//++++++++++++++++++++++++++++++++++++++++++++++++++++

 var pages = require('./pages')(UnderlyingChange,clientSideLiveData, dispatcher,modelHelpers);

 