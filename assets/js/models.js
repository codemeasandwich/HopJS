'use strict'

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

//=====================================================
//============================ WaterLine Model to SHARE
//=====================================================

define('models/User',    ['../../api/models/User'],     waterLine2BackBone);
define('models/Business',['../../api/models/Business'], waterLine2BackBone);
define('models/Task',    ['../../api/models/Task'],     waterLine2BackBone);

module.exports = {};
