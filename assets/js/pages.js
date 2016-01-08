"use strict"

var Backbone = require('backbone');
var $ = require('jquery');

var React    = require('react');
var ReactDom = require('react-dom');

// Execution sequence of a React component’s lifecycle methods << Good to know ;)
// http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/

//++++++++++++++++++++++++++++++++ Initiate the router
//++++++++++++++++++++++++++++++++++++++++++++++++++++

var appRoutes = {
    "*actions" : function ()   { console.log("index", arguments);    load(require('./.views/index')) },
    "user/:id" : function (id) { console.log("user/:id", arguments); load(require("./.views/user"),{id:id}) },
    "business" : function ()   { console.log("business", arguments); load(require("./.views/business"))     },
    "task"     : function ()   { console.log("task", arguments);     load(require("./.views/tasks")) },
    "*404"     : function ()   { console.log("*404", arguments);     load(require("./.views/404"))  }
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!! DONT EDIT !!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var load = function(pageElemt,loadModel) {
    
}

//+++++++++++++++++++++++++++++++++++ get router hashs
//++++++++++++++++++++++++++++++++++++++++++++++++++++

var router2Hashs = {};

for (var url in appRoutes){
  router2Hashs[url] = url.crc(); // e.g. "user/:id" : "a8740dec"
}
console.log("router2Hashs",router2Hashs);

var AppRouter = Backbone.Router.extend({
    routes:router2Hashs
});
  
//+++++++++++++++++++++++++++++++++++++ router contorl
//++++++++++++++++++++++++++++++++++++++++++++++++++++
    
var router = new AppRouter();

for (var url in appRoutes){
  router.on('route:'+router2Hashs[url], appRoutes[url])
}

Backbone.history.start({pushState: true});
  



/*

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


*/










/*

var handlers = {
  index:    require('./.views/index'),
  user:     require('./.views/user'),
  business: require('./.views/business'),
  tasks:    require('./.views/tasks'),
  notFound: require('./.views/404')
}

var Router = Backbone.Router.extend({
  routes: {
   '': 'index',
   'user': 'user',
   'business': 'business',
   'tasks': 'tasks',
   '*404': 'notFound'
  }
});

var routeMangaer = new Router();
routeMangaer.on('route', function(name, params) {

  var page = handlers[name];
  var route = { name: name, params: {} }
          
  if( !! params[0]){
    route.params = parseParams(decodeURIComponent(params[0]));
  }        
          
  ReactDom.render(React.createElement(page, {route:route}), document.getElementById("content"));
})
Backbone.history.start({pushState: true})

*/

//=====================================================
//===================================== Take over links
//=====================================================

// All navigation that is relative should be passed through the navigate
// method, to be processed by the router.  If the link has a data-bypass
// attribute, bypass the delegation completely.
$(document).on("click", "a:not([data-bypass])", function(evt) {
  // Get the anchor href and protcol
  var href = $(this).attr("href");
  var protocol = this.protocol + "//";

  // Ensure the protocol is not part of URL, meaning its relative.
  if (href && href.slice(0, protocol.length) !== protocol &&
      href.indexOf("javascript:") !== 0) {
    // Stop the default event to ensure the link will not cause a page
    // refresh.
    evt.preventDefault();

    // `Backbone.history.navigate` is sufficient for all Routers and will
    // trigger the correct events.  The Router's internal `navigate` method
    // calls this anyways.
    Backbone.history.navigate(href, true);
  }
});
