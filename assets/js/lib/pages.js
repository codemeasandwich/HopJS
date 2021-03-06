"use strict"

let Backbone = require('backbone');

let React    = require('react');
let ReactDom = require('react-dom');

let platform = require('./../../../config/platform').platform;
        
let userRoutes = {};
let userRoutesList = require("./../wiring/routes");

let req = require.context("./../.views", true, /\.js$/);

for (let route in userRoutesList) {
  //console.log("./"+userRoutesList[route]+".js");
  if (userRoutesList.hasOwnProperty(route)
  && "string" === typeof userRoutesList[route]) {
    userRoutes[route] = req("./"+userRoutesList[route]+".js");
  }
}

let Actions    = require('./../wiring/actions');

module.exports = function(UnderlyingChange,clientSideLiveData, dispatcher, modelHelpers){

//++++++++++++++++++++++++++++++++ Initiate the router
//++++++++++++++++++++++++++++++++++++++++++++++++++++
    let routes = { }
      
    for (let routeName in userRoutes){
      
      
      if( ! userRoutes.hasOwnProperty(routeName)){
        continue; // if the property is not on the routes object skip to the next one
      }
      
      //urlPattern[routeName] = RoutePattern.fromString(routeName);
      
      let routeNameS = [routeName];
      
      let charCount = routeName.length;
      
      //get the last char from routeName String
      if (routeName[charCount -1] !== "/"
      && undefined === routeName[routeName + "/"]) {
        //check if a route with a '/' is definded
        routeNameS.push(routeName + "/")
      } else if(undefined === routeName.substr(charCount - 2)){
        routeNameS.push(routeName.substr(charCount - 2))
      }
      
      routeNameS.forEach(function(routePattern){
        routes[routePattern] = load.bind(null, userRoutes[routeName],routePattern )
      }); // END for routeNameS
      
    } // END for userRoutes
    

    
    // let lastPageArgs;
    
    // Execution sequence of a React component’s lifecycle methods << Good to know ;)
    // http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/
    
    let Content = React.createClass({
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
          
            let dataJson = Object.keys(clientSideLiveData).reduce(function(pojo, collectionName){
     
                  pojo[collectionName] = clientSideLiveData[collectionName].toJSON();
                  return pojo;
              },{});
          
            return React.createElement( this.props.page, React.__spread({AppDB:dataJson}, this.props))
        }
    })
    
//=====================================================
//================================ Page load controller
//=====================================================
    
//  function load(pageElemt, routePattern, ..path fragment values.., quaryString) 
    function load(pageElemt, routePattern) {
             
//+++++++++++++++++++++++++++++++++++ set route object
//++++++++++++++++++++++++++++++++++++++++++++++++++++
        let completeUrl = Backbone.history.getFragment();

        let route = {
          url : completeUrl,
          path : completeUrl.split("?")[0],
          Pattern : routePattern,
          searchParams : {},
          search : "",
          fragments : {}
        };
        
//++++++++++++++++++++++++++++++++++ process arguments
//++++++++++++++++++++++++++++++++++++++++++++++++++++
    
        // remove the first 2 elements
        let args = [].slice.call(arguments).slice(2);
       
//+++++++++++++++++++++++++++++++ map args to fragment
//++++++++++++++++++++++++++++++++++++++++++++++++++++

        // if no quary was set in URL this will be null
        let quary = args.pop();
        
        // if not null
        if (quary) {
          try{
          route.search = quary;
          // fix missing values
          route.searchParams = quary.split("&").reduce((items,quaryItem)=>{
            
            let key_value = quaryItem.split("=");
            
            // no value set to null
            items[decodeURIComponent(key_value[0])] =
              (1 === key_value.length) ? null : decodeURIComponent(key_value[1]);
            
            // cast to boolean
            
            // cast to int
            
            // cast to float
                                                                             
            return items;
            },{});
            
          } catch (err){
            console.error(err);
          }
        }
        
//+++++++++++++++++++++++++++ map path fragment values
//++++++++++++++++++++++++++++++++++++++++++++++++++++

        if(routePattern.includes(":")){
          //step 1          
          let fragmentNames = 
          routePattern.split(":").map((piece)=>{return piece.split("/")[0]}).slice(1);
          
          //step 2
           route.fragments =
           fragmentNames.reduce((fragments, fragmentName,index)=>{
              fragments[fragmentName] = args[index];
              return fragments;
            },{});
        }
        
//++++++++++++++++++++++++++++ values to send to page
//++++++++++++++++++++++++++++++++++++++++++++++++++++

        let props = {
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
    
    let AppRouter = Backbone.Router.extend({
      routes:routes
    });
      
//+++++++++++++++++++++++++++++++++++++ router contorl
//++++++++++++++++++++++++++++++++++++++++++++++++++++
        
    let router = new AppRouter();
    
    Backbone.history.start({pushState: true});
    
//=====================================================
//===================================== Take over links
//=====================================================
    
    let $ = require('jquery');
    
    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router.  If the link has a data-bypass
    // attribute, bypass the delegation completely.
    
    $(document).on("click", "a:not([data-bypass])", function(evt) {
      
      // Get the anchor href and protcol
      let href = $(this).attr("href");
      let protocol = this.protocol + "//";
    
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
