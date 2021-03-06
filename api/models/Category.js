/**
 * Category
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var validation = require('../../lib/validation.js');

module.exports = {

  types:{
    model:validation.is_model
  },

  attributes: {
  	
  	father:{
      type:'string',
      model:'category'
    },

    name:{
      type:'string',
      minLength:2,
      required:true
    },

    image:{
      type:"string"
    }

    
  }

};
