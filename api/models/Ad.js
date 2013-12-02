/**
 * Ad
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var validation = require('../../lib/validation.js');

module.exports = {
	

  types:{
    model:validation.is_model,
    ad:is_ad
  },


  attributes: {
  	author: {
  		type:"json",
  		required:true,
      model:'user'
  	},

  	deceased: {
  		type:'json',
      model:'deceased'
  	},

    ad:{
      type:'json',
      ad:true
    }
  }

};

function is_ad(ad){
  return true;
}