/**
 * Deceased
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var validation = require('../../lib/validation.js');

module.exports = {


  types:{
    passport:validation.is_passport,
    location:validation.is_location,
    public_profile: validation.is_public_profile,
    model:validation.is_model
  },

  attributes: {
  	name:{
      type:"string",
      minLength:2,
      required:true
    },
    last_name:{
      type:"string",
      minLength:2,
      required:true
    },
    middle_name:{
      type:"string",
      minLength:2
    },
    passport:{
      type:"string",
      passport:true
    },
    birth_date:{
      type:'date'
    },
    death_date:{
      type:'date'
    },
    burial_date:{
      type:'date'
    },
    graveyard:{
      type:'string'
    },
    photo:{
      type:'string'
    },
    public_profiles:{
      type:"array",
      public_profile:true
    },
    about:{
      type:'string'
    },
    gallery:{
      type:'array',
      model:'photo'
    },
    birth_address:{
      type:'string',
      location:true
    },
    address:{
      type:'string',
      location:true
    },
    responsible:{
      type:'string',
      model:"user"
    }
  },
  afterCreate:function(deceased,next){
    Ad.create({
      deceased:{
        id:deceased.id
      },
      details:{
        "type":"deceased"
      }
    },function(err,ad){
      if(err) return next(err.ValidationError);
      next();
    });
    
  }

};


