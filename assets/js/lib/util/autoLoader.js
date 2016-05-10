"use strict"

module.exports = function(path,fileList){
  
  var req = require.context(path, true, /\.js$/);
  var fileAll = req.keys();
  var userRoutes = {};
  
  for (var route in fileList) {
    if (fileList.hasOwnProperty(route)
    && "string" === typeof fileList[route]) {
      userRoutes[route] = req("./"+fileList[route]+".js");
    } else if("function" === typeof fileList[route]){
      userRoutes[route] = fileList[route];
    }
  }
  
  return userRoutes;
}
