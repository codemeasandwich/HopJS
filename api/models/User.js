/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

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
};
