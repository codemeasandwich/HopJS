"use strict"

//=====================================================
//===================================== Web Application
//=====================================================

var AppData = require('./lib/models');
var ACTIONS = require('./settings/actions');

//+++++++++++++++++++++++++++ User defined collections
//++++++++++++++++++++++++++++++++++++++++++++++++++++
var myStores = {
	users : new AppData.collections.User()
}

module.exports = function(emit){

  console.log("in App with emit of",emit)

  this.userStores = myStores,
  
  this.reciver = function(actionName,data){
  
	return new Promise(function(resolve, reject) {
	  // do a thing, possibly async, then…
	  try{

	      switch(actionName){
	        case ACTIONS.ADD.USER:

	        	var isBad = AppData.checkModelInput("User", data)
	        	
	        	if( isBad ){
	        		return reject(Error(isBad.message))
	        	}
			   myStores.users.add(data)
			   console.log("Number of users:",myStores.users.length)
	           resolve(true);
             console.log("this.emit",this)
             emit();
	          break;
	        default:
	        	resolve(false);
	      }

	  } catch(error){
	  	return reject(error)
	  }

    });
  }
}