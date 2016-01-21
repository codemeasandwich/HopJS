'use strict'

module.exports = {

  models : {
      User:require('../../api/models/User'),
      Business:require('../../api/models/Business')
  },
  routes : {
      "user"     : require("./.views/user"),
      "user/:id" : require("./.views/user"),
      "business" : require("./.views/business"),
      "business/" : require("./.views/user"),
      "task"     : require("./.views/tasks"),
      "*actions" : require('./.views/index'),
      "*404"     : require("./.views/404")
  }

}