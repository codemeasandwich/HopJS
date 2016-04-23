'use strict'


var Actions = require('./../wiring/actions');

module.exports = function(AppDB){
 
    this.reactor = function (actionName,data) {
      
      // we wont work on this task
      if (Actions.ADD.USER === actionName) {
        return;
      }
      
    return new Promise(function(resolve, reject) {
      
      
      resolve(true);
      
      // >> collections !!
      
      // Registered user
      
      // and
      
      // Unregistered user
      
      
      
      
      
      
    }); // END Promise
  } // END reactor
}