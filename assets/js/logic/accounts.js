'use strict'

var Actions = require('./../wiring/actions');

var Accounts = function(AppDB){
    
    this[Actions.ADD.USER] = function (data) {
      
    return new Promise(function(resolve, reject) {
      
      
      console.log("save new account with ",data);
      
       resolve(true);
      
      
      
      
    }); // END Promise
  };
  
  this.reactor = function (actionName,data) {
    return new Promise(function(resolve, reject) {
      
      console.log("Accounts reactor");
       resolve(true);
      
    }); // END Promise
  }
};

      console.log(Actions.ADD.USER,Accounts);
module.exports = Accounts;
