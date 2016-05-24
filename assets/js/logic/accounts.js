'use strict'

var Actions = require('./../wiring/actions');

var Accounts = function(AppDB){
    
    this[Actions.ADD.USER] = function (data) {
      
    return new Promise(function(resolve, reject) {
      AppDB.User.add(data);
      console.log("AppDB.User",AppDB.User);
      AppDB.User.sync();
      console.log(" -- sync -- ");
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
