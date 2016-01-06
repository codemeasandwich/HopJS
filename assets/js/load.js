"user strict";

var React    = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');

var $ = require('jquery');

var Models = ["User","Business","Task"];

//=====================================================
//================================== JS prototype hacks
//=====================================================
/**
* Array function to remove the first occurrence of a value
*
* @method remove
* @param {Number|String} text text to lookup by
* @return {Array} an array with the removed value OR empty if value was not found
*
* @example var a = ['x','y']; a.remove('x')
* 
*/
  if ( ! Array.prototype.remove) {
   Array.prototype.remove = function(val) {
     var i = this.indexOf(val);
          return i>-1 ? this.splice(i, 1) : [];
   };
 }
/**
* Array function to convert into an object
*
* @method toObject
* @param {Array} keys list of attributes names
* @return {Object} array values mapped to keys
*
* @example var a = ['x','y']; a.toObject(['a','b'])
* 
*/
if ( ! Array.prototype.toObject) {
   Array.prototype.toObject = function(keys){
      return this.reduce(function(prev,curr,index){ prev[keys[index]] = curr; return prev },{})
   }
}

/**
* Object function to provide the same functionality as the Arrays forEach
*
* @method forEach
* @param {Function} callback run for each property in the object
* @param {Bool} all only fire callback in basic value. e.g. number, strings, bools & nasted objects
*
* @example var a = {'x':123}; a.forEach(function(prop,name){ alert(name+" is "+prop) })
* 
*/
if ( ! Object.prototype.forEach) {
   Object.prototype.forEach = function(callback, all){
      
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          if (all || typeof this[key] == "string"
                  || typeof this[key] == "array"
                  || typeof this[key] == "object"
                  || typeof this[key] == "number"
                  || typeof this[key] == "boolean") {
            callback(this[key],key,this);
          }
        }
      }
   }
}

//=====================================================
//========================= WaterLine Model TO BackBone
//=====================================================


function waterLine2BackBone (Model){
  
  var bluePrint = {
    defaults: {},
    url:'',
    // initialize:function(){},
    // validate:function(){},
    // toJSON:function(){}
  }
  
  Model.attributes.forEach(function(typeObj, name){
    
    typeObj = ("object" == typeof typeObj) ? typeObj : { type : typeObj }
    
    if (typeObj.defaultsTo) {
      
      bluePrint.defaults[name] = typeObj.defaultsTo;
    
    } else if (typeObj.model) {
      // model ID
    
      
    } else{
      switch(typeObj.type.toLowerCase()) {
          case "string":
          case "text":
          case "email":
            bluePrint.defaults[name] = ''
              break;
          case "integer":
          case "float":
            bluePrint.defaults[name] = 0
              break;
          case "date":
          case "datetime":
            bluePrint.defaults[name] = null
              break;
          case "boolean":
            bluePrint.defaults[name] = false
              break;
          case "binary":
            bluePrint.defaults[name] = null
              break;
          case "array":
            bluePrint.defaults[name] = []
              break;
          case "json":
            bluePrint.defaults[name] = {}
              break;
          default:
              throw new Error("Model type unknown. "+typeObj.type);
      } 
    }
    bluePrint.defaults[name];
  })
  console.log(bluePrint);
  return Backbone.Model.extend(bluePrint);
}

Models.forEach(function(model){
    define('models/'+model,['../../api/models/'+model],waterLine2BackBone) 
  })

Models.forEach(function(model){
  
  var modelURL = 'models/'+model
  
    console.log(require(modelURL)); 
  })

//=====================================================
//==================================== Global Utilities
//=====================================================
/**
* internasional function
*
* @method __
* @param {String} text text to lookup by
* @param {Object} replace An object mapping place holder with the value
* @return {String} the translated text
*
* @example __(" %MIN% to %MAX% letters",{MIN:min,MAX:max})
* 
*/
window.__ = function(text,replace){
      if (undefined === replace) {
        return text
      }
      return text.replace(/%\w+%/g,
        function(word) {
          word = word.substr(1,word.length-2);
          return replace[word] || word;
        })
    }


function parseParams(str) {
    return str.split('&').reduce(function (params, param) {
        var paramSplit = param.split('=').map(function (value) {
            return decodeURIComponent(value.replace('+', ' '));
        });
        params[paramSplit[0]] = paramSplit[1];
        return params;
    }, {});
}

//=====================================================
//=====================================================
//=====================================================


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

module.exports = routeMangaer

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

