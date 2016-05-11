"use strict"

var Backbone = require('backbone');

var React    = require('react');
var ReactDom = require('react-dom');

var userRoutes = {};
var userRoutesList = require("./../wiring/routes");

var req = require.context("./../.views", true, /\.js$/);

for (var route in userRoutesList) {
  if (userRoutesList.hasOwnProperty(route)
  && "string" === typeof userRoutesList[route]) {
    userRoutes[route] = req("./"+userRoutesList[route]+".js");
  }
}

var Actions    = require('./../wiring/actions');

module.exports = function(UnderlyingChange,clientSideLiveData, dispatcher, modelHelpers){

//++++++++++++++++++++++++++++++++ Initiate the router
//++++++++++++++++++++++++++++++++++++++++++++++++++++
    var routes = { }
      
    for (var routeName in userRoutes){
      
      if( ! userRoutes.hasOwnProperty(routeName)){
        continue; // if the property is not on the routes object skip to the next one
      }
      
      var routeNameS = [routeName];
      
      var charCount = routeName.length;
      
      //get the last char from routeName String
      if (routeName[charCount -1] !== "/"
      && undefined === routeName[routeName + "/"]) {
        //check if a route with a '/' is definded
        routeNameS.push(routeName + "/")
      } else if(undefined === routeName.substr(charCount - 2)){
        routeNameS.push(routeName.substr(charCount - 2))
      }
      
      routeNameS.forEach(function(routeID){
        routes[routeID] = load.bind( null, userRoutes[routeName] )
      }); // END for routeNameS
    } // END for userRoutes
    

    
    // var lastPageArgs;
    
    // Execution sequence of a React component’s lifecycle methods << Good to know ;)
    // http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/
    
    var Content = React.createClass({
        displayName: 'Body Content',
        getInitialState : function(){
          UnderlyingChange.on(this.reload);
          return { count : 0 }  
        },
        reload : function(type, data, changes){
          this.setState({ count : this.state.count++ });
        },
        componentDidMount : function(){
          UnderlyingChange.on(this.reload);
        },
        componentWillUnmount : function(){
          UnderlyingChange.off(this.reload);
        },
        render: function(){
          
            var dataJson = Object.keys(clientSideLiveData).reduce(function(pojo, collectionName){
     
                  pojo[collectionName] = clientSideLiveData[collectionName].toJSON();
                  return pojo;
              },{});
          
            return React.createElement( this.props.page, React.__spread({AppDB:dataJson}, this.props))
        }
    })
    
    function load(pageElemt,loadModel) {
        
        var route = { name : name, params : {} };
        var platform = require('./../../../config/platform').platform;
        
        var props = {
          page : pageElemt,
          route : route,
          platform : platform,
          
          Emit : {
            ACTIONS : Actions,
            Fire : dispatcher.fire
          },
          modelHelpers:modelHelpers
        };
        
        let body = React.createElement(Content, props);
            
        ReactDom.render(body,document.getElementById("content"));
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

}
