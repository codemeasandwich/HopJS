'use strict'

var Backbone = require('backbone');

//=====================================================
//========================= WaterLine Model TO BackBone
//=====================================================

module.exports = (name, Model) => {
  
  //console.log("aterLine Model TO BackBone",arguments);
  
  var bluePrint = {
    defaults: {},
    url:name,
    // initialize:function(){},
    // validate:function(){},
    // toJSON:function(){}
  };
  
 for (var name in Model.attributes){
 var typeObj = Model.attributes[name];
    
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
            bluePrint.defaults[name] = '';
              break;
          case "integer":
          case "float":
            bluePrint.defaults[name] = 0;
              break;
          case "date":
          case "datetime":
            bluePrint.defaults[name] = null;
              break;
          case "boolean":
            bluePrint.defaults[name] = false;
              break;
          case "binary":
            bluePrint.defaults[name] = 0b0;
              break;
          case "array":
            bluePrint.defaults[name] = [];
              break;
          case "json":
            bluePrint.defaults[name] = {};
              break;
          default:
              throw new Error("Model type unknown. "+typeObj.type);
      } 
    }
    //bluePrint.defaults[name];
  }
  return Backbone.Model.extend(bluePrint);
}

