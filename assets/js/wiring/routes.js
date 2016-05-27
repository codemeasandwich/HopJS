'use strict'
//console.info("# loading settings/routes");

module.exports = { // this will pull page.. but pages need store
      "tasks/:hash" : "tasks/_hash",
      "tasks/:hash/as/:we" : "index",
      "tasks"    : "tasks/index",
      //"*actions" : "index",
      "" : "index",
      "*404"     : "404"
    //'*invalidRoute' : 'showErrorPage'
    //
}
//console.info("## loaded settings/routes",module.exports);