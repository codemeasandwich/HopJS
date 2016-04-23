'use strict'
//console.info("# loading settings/routes");

module.exports = { // this will pull page.. but pages need store
      "user"     : require("./../.views/user"),
      "user/:id" : require("./../.views/user"),
      "notifications" : require("./../.views/notifications"),
      "business" : require("./../.views/business"),
      "task"     : require("./../.views/tasks"),
      "*actions" : require('./../.views/index'),
      "*404"     : require("./../.views/404")
}
//console.info("## loaded settings/routes",module.exports);