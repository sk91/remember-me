/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var validation = require('../../lib/validation.js');



module.exports = {

  types:{
    phone:validation.is_phone,
    passport:validation.is_passport
  },

  attributes: {
    name:{
      type:'string',
      required:true,
      minLength:2
    },
    last_name:{
      type:'string',
      minLength:2,
      required:true
    },
    photo:{
      type:"string"
    },
    passport:{
      type:"string",
      required:true,
      passport:true
    },
    email:{
      type:'string',
      required:true,
      email:true
    },
    phone:{
      type:'string',
      required:true,
      phone:true
    },
    password:{
      type:'string',
      minLenght:6
    }
  }

};


