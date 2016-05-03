'use strict'
//console.info("# loading settings/routes");

module.exports = { // this will pull page.. but pages need store
      "user"     : "user",
      "user/:id" : "user",
      "notifications" : "notifications",
      "business" : "business",
      "task"     : "tasks",
      "*actions" : "index",
      "*404"     : "404"
}
//console.info("## loaded settings/routes",module.exports);