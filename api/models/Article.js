/**
 * Article
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var validation = require('../../lib/validation.js');

module.exports = {

  types:{
    model:validation.is_model,
    tags:validation.is_tags,
    comment:validation.is_comment
  },

  attributes: {
    name:{
      type:"string",
      required:true
    },
    text:{
      type:"string"
    },
  	category:{
      type:"string",
      model:'category',
      default:null
    },
    tags:{
      type:"array",
      tags:true
    },
    big_image:{
      type:'string`'
    },
    small_image:{
      type:'string'
    },
    comments:{
      type:"array",
      comment:true
    }

  }

};
