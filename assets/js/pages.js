"use strict"

var Backbone = require('backbone');

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
    console.info("pageElemt", pageElemt);
    var route = { name: name, params: {} }
    ReactDom.render(React.createElement(pageElemt, {route:route}), document.getElementById("content"));
}

//+++++++++++++++++++++++++++++++++++ get router hashs
//++++++++++++++++++++++++++++++++++++++++++++++++++++

var router2Hashs = {};

//for (var url in appRoutes){
appRoutes.forEach(function(fn,url){
  router2Hashs[url] = url.crc(); // e.g. "user/:id" : "a8740dec"
},true)
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

//=====================================================
//===================================== Take over links
//=====================================================

var $ = require('jquery');
console.log($)
// All navigation that is relative should be passed through the navigate
// method, to be processed by the router.  If the link has a data-bypass
// attribute, bypass the delegation completely.
$(document).on("click", "a:not([data-bypass])", function(evt) {
  
  console.log("Backbone.history.navigate");
  alert("")
  
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
