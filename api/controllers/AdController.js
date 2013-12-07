/**
 * AdController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var _ = require('lodash');

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AdController)
   */
  _config: {},


  index:function(req,res){

    var full_name = req.param('full_name')
      , name = req.param('name')
      , last_name = req.param('last_name')
      , death_date_before=req.param('death_date_before')
      , death_date_after = req.param('death_date_after')
      , death_date = req.param('death_date')
      , birth_date_before= req.param('birth_date_before')
      , birth_date_after = req.param('birth_date_after')
      , birth_date = req.param('birth_date')
      , query = {};

    if(full_name){
      //search full name agains name and last name (limit fullname to 3 words)
      full_name=full_name.trim().replace(/ +(?= )/g,'').split(" ").slice(0,3);
      full_name=new RegExp("^(" + full_name.join("|") +")(.*)",'i');
      name = name || full_name;
      last_name = last_name || full_name;
    }
    if(!birth_date){
      if(birth_date_after){
        birth_date={birth_date:{$gt:birth_date_after}};
      }
      if(birth_date_before){
        birth_date = birth_date || {birth_date:{}};
        birth_date.birth_date['$lt'] = birth_date_before;
      }
    }else{
      birth_date = {birth_date:birth_date}
    }

    if(!death_date){
      if(death_date_after){
        death_date={death_date:{$gt:death_date_after}};
      }
      if(death_date_before){
        death_date= death_date || {death_date:{}};
        death_date.death_date['$lt'] = death_date_before;
      }
    }else{
      death_date = {death_date:death_date}
    }


    if(name){
        name = {name:name};
    }
    if(last_name){
      last_name = {last_name:last_name};
    }

    query=_.assign(query,name,last_name,birth_date,death_date);
    if(!_.isEmpty(query)){
      console.log("passes");
    }

    Ad.find(query,function found_ads(err,data){
      res.send(data);
    })
  },  
};

