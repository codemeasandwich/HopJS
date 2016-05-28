'use strict'
var moment = require('moment');

/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  hop:true,
  schema: true,

  attributes: {
    name: {
      type:'Text',
      required: true
    },
    deadline: {
      type:'datetime',
      required: true,
      defaultsTo: function() {
        return moment().add(1,"hours").toDate();
      }
    },
    completed: {
      type:'Boolean',
      defaultsTo:false
    }
  
  }
};
