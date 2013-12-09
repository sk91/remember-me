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
  		//required:true,
      model:'user'
  	},

  	deceased: {
  		type:'json',
      model:'deceased'
  	},

    deatails:{
      type:'json',
      ad:true
    }
  },
  beforeCreate:attach_deceased,
  beforeUpdate:attach_deceased
};

function is_ad(ad){
  return true;
}

function attach_deceased(ad,next){
  if(!("deceased" in ad && "id" in ad.deceased)){
    return next("No deceased attached");
  }

  Deceased.findOne({"id":ad.deceased.id},function deceased_found(err,deceased){
    if(err) return next(err);
    if(!deceased) return next("Deceased not found");
    ad.deceased = {
      "id": deceased.id,
      "name":deceased.name,
      "last_name":deceased.last_name,
      "birth_date": deceased.birth_date,
      "death_date": deceased.death_date,
      "photo":deceased.photo
    }
    next();
  });
}