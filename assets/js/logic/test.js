'use strict'


var Actions = require('./../wiring/actions');

var Accounts = function(AppDB){

    this[Actions.ADD.TASK] = function (data) {
      
    return new Promise(function(resolve, reject) {
      AppDB.Task.add(data);
      AppDB.Task.sync();
      resolve(true);
    }); // END Promise
  };
  
  this.reactor = function (actionName,data) {
    return new Promise(function(resolve, reject) {
       resolve(true);
    }); // END Promise
  }
};

module.exports = Accounts;
