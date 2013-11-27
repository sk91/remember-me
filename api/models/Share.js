/**
 * Share
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var validation = require('../../lib/validation.js');

module.exports = {


  types:{
    model: validation.is_model,
    contacts:is_contacts
  },

  attributes: {
  	author:{
      type:'string',
      required:true,
      model:"user"
    },
    deceased:{
      type:"json",
      required:true,
      model:"deceased"
    },
    ad:{
      type:"json",
      required:true,
      is_ad:true
    },
    email:{
      type:"array",
      contacts:'email'
    },
    sms:{
      type:"array",
      contacts:'phone'
    },
    seenlist:{
      type:"array"
    }
  }

};


function is_contacts(contacts,type){
  return true;
}
