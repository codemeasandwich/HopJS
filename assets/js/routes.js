"use strict"
define(['app','backbone','config'], function(App,Backbone,config){

// Execution sequence of a React component’s lifecycle methods << Good to know ;)
// http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/

//++++++++++++++++++++++++++++++++ Initiate the router
//++++++++++++++++++++++++++++++++++++++++++++++++++++

var cjRoutes = {
    "user/:id" : function (id) { load("js/views/"+deviceType+"/User",{id:id});     },
    "event"    : function ()   { load("js/views/shared/createEvent");              },
    "event/:id": function (id) { load("js/views/"+deviceType+"/event",{id:id, type:"event" })  },
    "*actions" : function ()   { load("js/views/"+deviceType+"/events"); }
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!! DONT EDIT !!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var deviceType = config.local.view;

var load = function(pageURI,loadModel) {
   
    require(['loader','js/views/shared/layout'], function(loading,layout){
      
      (new loading()).init();
      
      if (loadModel) {
        
        // App[loadModel.type+'s']
        App.events.master
         .lookup(loadModel.id)
         .then(function(model){
            layout(pageURI,model);
          })
         .catch(function(error){
          console.error(error)
            alert("log error to server");
          })
         
      } else {
        layout(pageURI);
      }
      
    });
}

//+++++++++++++++++++++++++++++++++++ get router hashs
//++++++++++++++++++++++++++++++++++++++++++++++++++++

var router2Hashs = {};

for (var url in cjRoutes){
  router2Hashs[url] = url.crc();
}
console.log(router2Hashs);

  var AppRouter = Backbone.Router.extend({
      routes:router2Hashs
  });
  
//+++++++++++++++++++++++++++++++++++++ router contorl
//++++++++++++++++++++++++++++++++++++++++++++++++++++

  return function () {
    
      var router = new AppRouter();
      
      for (var url in cjRoutes){
        router.on('route:'+router2Hashs[url], cjRoutes[url])
      }
      
      Backbone.history.start();
  
      return router;
  };

});
