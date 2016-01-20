"use strict"

//++++++++++++++++++++++++++++++++ Initiate the router
//++++++++++++++++++++++++++++++++++++++++++++++++++++
  var routes = {
      "user/:id" : load.bind(null,require("./.views/user")),
      "business" : load.bind(null,require("./.views/business")),
      "task"     : load.bind(null,require("./.views/tasks")),
      "*actions" : load.bind(null,require('./.views/index')),
      "*404"     : load.bind(null,require("./.views/404"))
  }


















// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!! DONT EDIT !!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var Backbone = require('backbone');

var React    = require('react');
var ReactDom = require('react-dom');

// Execution sequence of a React component’s lifecycle methods << Good to know ;)
// http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/

function load(pageElemt,loadModel) {
    console.info("page load", arguments);
    var route = { name: name, params: {} }
    ReactDom.render(React.createElement(pageElemt, {route:route}), document.getElementById("content"));
}

//+++++++++++++++++++++++++++++++++++ get router hashs
//++++++++++++++++++++++++++++++++++++++++++++++++++++

var AppRouter = Backbone.Router.extend({
  routes:routes
});
  
//+++++++++++++++++++++++++++++++++++++ router contorl
//++++++++++++++++++++++++++++++++++++++++++++++++++++
    
var router = new AppRouter();

Backbone.history.start({pushState: true});

//=====================================================
//===================================== Take over links
//=====================================================

var $ = require('jquery');

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
