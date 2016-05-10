'use strict'

var Backbone = require('backbone');

//=====================================================
//=============================== Backbone Model update
//=====================================================

  Backbone.Model.prototype.update = function (key, val, options) {
    
    if (undefined === val) {
      console.warn("You are setting undefined as a value!");
    }
    
    options = options || {};
    options.validate = options.validate || true;
    options.key = key;
    return !!this.set(key, val, options);
  };