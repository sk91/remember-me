/**
 * Contact
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */


var validation = require('../../lib/validation.js');

module.exports = {

  types:{
    phone:validation.is_phone
  },
  
  attributes: {
  	name:{
      type:'string',
      required:'true',
      minLength:2
  	},
    last_name:{
      type:'string',
      minLength:2
    },
    email:{
      type:'string',
      email:true
    },
    phone:{
      type:'string',
      phone:true
    }
  }

};
