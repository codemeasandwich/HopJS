"use strict"

//=====================================================
//===================================== Web Application
//=====================================================
console.log(" ===== app.js")
var construtor = function(){
  
  console.log(" FIREING APP construtor function")
  
  this.name = "app"

}

module.exports = construtor;
console.log(" ----- app.js",construtor)