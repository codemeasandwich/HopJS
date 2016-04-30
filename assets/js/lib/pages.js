"use strict"

var userRoutes = require("./../wiring/routes");
var Actions    = require('./../wiring/actions');

module.exports = function(AppData,AppDB, dispatcher){
      
console.log(" KX AppData",AppData);
      
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
    
    var Backbone = require('backbone');
    
    var React    = require('react');
    var ReactDom = require('react-dom');
    
    var STORES  = require('./storesHelper');
    
    // var lastPageArgs;
    
    // Execution sequence of a React component’s lifecycle methods << Good to know ;)
    // http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/
    
    var Content = React.createClass({
        displayName: 'Body Content',
        getInitialState : function(){
          console.log('Body Content',"getInitialState");
          AppData.bind(this.reload);
          return { count : 0 }  
        },
        reload : function(type, data, changes){
          console.log("RELOAD",arguments);
          //console.log(JSON.stringify(arguments));
          
          this.setState({ count : this.state.count++ });
        },
        componentDidMount : function(){
          //TODO: on Backbone colltion change.. reload view
          console.log('Body Content',"componentDidMount");
          AppData.bind(this.reload);
          // dispatcher.fire(this.reload)
        },
        componentWillUnmount : function(){
          AppData.unbind(this.reload);
         // dispatcher.remove(this.reload)
        },
        render: function(){
          
            var AppDBJson = Object.keys(AppDB).reduce(function(pojo, collectionName){
                  pojo[collectionName] = AppDB[collectionName].toJSON();
                  return pojo;
              },{})
          
            return React.createElement( this.props.page, React.__spread({AppDB:AppDBJson}, this.props))
        }
    })
    
    function load(pageElemt,loadModel) {
        
        console.log("LOAD",pageElemt);
        
        var route = { name : name, params : {} };
        var platform = require('./../../../config/platform').platform;
        
        var props = {
          page : pageElemt,
          route : route,
          platform : platform,
          
          Emit : {
            ACTIONS : Actions,
            Fire : dispatcher.fire
          }
        };
        
        ReactDom.render(React.createElement(Content, props),document.getElementById("content"));
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
