'use strict'

var Actions = require('./../wiring/actions');

//=====================================================
//============================================ Accounts
//=====================================================

var Accounts = function(AppDB){

//+++++++++++++++++++++++++++++++++++++++++++ Add Task
//++++++++++++++++++++++++++++++++++++++++++++++++++++

    this[Actions.ADD.TASK] = function (data) {
      
     data.id = new Date().getTime();
     
    return new Promise(function(resolve, reject) {
      AppDB.Task.add(data);
      //AppDB.Task.sync();
      setTimeout(function () {
        resolve(true);
    }, 5000);
      
    }); // END Promise
  };
  
//++++++++++++++++++++++++++++++++++++++++ Update Task
//++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  this[Actions.UPDATE.TASK] = function (data) {
     
    return new Promise(function(resolve, reject) {
      AppDB.Task.get(data.id).set(data);
      //AppDB.Task.sync();
      setTimeout(function () {
        resolve(true);
    }, 5000);
      
    }); // END Promise
  };
  
//++++++++++++++++++++++++++++++++++++++++ Delete Task
//++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  this[Actions.DEL.TASK] = function (taskId) {
      
      console.log("So you want to delete",taskId);
      
    return new Promise(function(resolve, reject) {
      
      AppDB.Task.remove(taskId);
      //AppDB.Task.sync();
        setTimeout(function () {
        resolve(true);
      }, 5000);
    }); // END Promise
  };
  
//+++++++++++++++++++++++++++++++++++++++++ Reactor !!
//++++++++++++++++++++++++++++++++++++++++++++++++++++
  
  this.reactor = function (actionName,data) {
    return new Promise(function(resolve, reject) {
       resolve(true);
    }); // END Promise
  }
};

//=====================================================
//============================================== Export
//=====================================================

module.exports = Accounts;
