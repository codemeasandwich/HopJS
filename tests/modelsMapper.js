"use strict"
var expect = require('chai').expect;
var mapper = require('../assets/js/lib/modelsMapper');

//=====================================================
//============================= We will test the stores 
//=====================================================

var mokeModel = {
	attributes: {
    
    firstName: {
        type: 'String',
        required: true,
        maxLength: 40,
        minLength: 4,
      },
    lastName: 'String',
    email: {
        type: 'email',
        required: true,
        unique: true
      },
    age: {
      type: 'integer',
      min: 18
    },
    city:"string"
  
  }
}

describe("models mapper", function() { // log the file you are working on
	
	describe("waterLine 2 BackBone", function() { //log the function
		it("using moke model", function(){
			
			var bbModel = mapper(mokeModel);
			// http://backbonejs.org/#Model-attributes
			expect(true).to.be.true;
			
		}) //log the action around the function you are trying to test
		
	});
});
