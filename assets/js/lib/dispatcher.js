'use strict'

//++++++++++++++++++++++++++++++++++++++++ Event stuff
//++++++++++++++++++++++++++++++++++++++++++++++++++++

var callBacks = [];

var dispatcher = function(AppDB){
  
//++++++++++++++++++++++++++++ load modules from logic
//++++++++++++++++++++++++++++++++++++++++++++++++++++

  var req = require.context("../logic", true, /\.js$/);
  var fileNames = req.keys();
   // the 'map' load the file names from keys into the module.exports
  fileNames.map(req).forEach(function(worker,index){
  
    if ("function" === typeof worker) {
      worker = new worker(AppDB);
    }
    
    if ("undefined" === typeof worker.reactor) {
      throw new Error("All logic files must have a 'reactor' function. "+fileNames[index]+" is missing one");
    }
  
    if ("function" !== typeof worker.reactor) {
      throw new Error("'reactor' must be a function. See "+fileNames[index]);
    }
    
    console.log("loading logic from",fileNames[index]);
    console.log("will fire",worker);
    callBacks.push(worker);
    
  });
  
//=====================================================
//====================== Views or Workers can fire emit
//=====================================================

  this.fire = function(actionName,data,explicit){
    
    var stats = {explicit:0, general:0, skipped:0}
    
    if ("undefined" === typeof actionName) {
      throw new Error("actionName is undefined");
    }
    console.log("Fire:"+actionName,data);
    
    var workToDo = 
    callBacks.reduce(function(workers,worker){
      
      var todo = false;
      var halderTypeName = "skipped";
      
      if ("function" === typeof worker[actionName]) {
        halderTypeName = "explicit";
        todo = worker[actionName](data);
      } else if( ! explicit){
        halderTypeName = "general";
        //Note: may return undefined, null or false
        // if not interest in this action
        todo = worker.reactor(actionName,data);
      }
      
      if (todo) {
        workers.push(todo);
        stats[halderTypeName]++;
      } else {
        stats.skipped++;
      }
      
      return workers;
    },[]);
    
    console.info(actionName+" is being handled by ",stats);
    
    return Promise.all(workToDo);
    
  };
}


module.exports = dispatcher;

