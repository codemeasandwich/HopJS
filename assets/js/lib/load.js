"user strict";
//=====================================================
//=============== >> The enrty point << ===============
//=====================> webpack <=====================

 require('./bootstrap');
 
//=====================================================
//============================================ template
//=====================================================

//++++++++++++++++++++++++++++++++++ initialise stores
//++++++++++++++++++++++++++++++++++++++++++++++++++++

var waterLineModels = require('./template/files');
                      require('./template/addons');

var backboneModels = require('./template/generator')(waterLineModels);

var modelHelpers = require('./template/helpers');
    modelHelpers = new modelHelpers(backboneModels);
    
var clientSideLiveData = {};
clientSideLiveData.collections = require('./template/instance')(backboneModels.collections);

var emiter = require('./template/emit')(clientSideLiveData.collections);

//+++++++++++++++++++++++++++++ dispatcher / app logic
//++++++++++++++++++++++++++++++++++++++++++++++++++++

var Dispatcher = require('./dispatcher');

var dispatcher = new Dispatcher(clientSideLiveData.collections);

//++++++++++++++++++++++++++++++++ UI / pages / rouths
//++++++++++++++++++++++++++++++++++++++++++++++++++++

 var pages = require('./pages')(emiter,clientSideLiveData, dispatcher,modelHelpers);

 