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


  index:function(req,res,next){

    var full_name = req.param('full_name')
      , name = req.param('name')
      , last_name = req.param('last_name')
      , death_date_before= req.param('death_date_before')
      , death_date_after = req.param('death_date_after')
      , death_date = req.param('death_date')
      , birth_date_before= req.param('birth_date_before')
      , birth_date_after = req.param('birth_date_after')
      , birth_date = req.param('birth_date')
      , query = Ad.find();

    if(full_name){
      var where_query = [];
      //search full name agains name and last name
      full_name=full_name.trim().replace(/ +(?= )/g,'').split(" ");
      for(var i = 0; i<full_name.length;i++){
        if(!name && !last_name && full_name.length>1){
          for(var j in full_name){
            where_query.push({
              'deceased.name':{'startsWith':full_name[i]},
              'deceased.last_name':{'startsWith':full_name[j]}
            });
          }
        }else{
          if(!name){
            where_query.push({'deceased.name':{'startsWith':full_name[i]}});
          }if(!last_name){
            where_query.push({'deceased.last_name':{'startsWith':full_name[i]}});
          }
        }
        if(where_query.length>0){
          query.where({"or":where_query});
        }
      }
     
    }

    if(name){
      query.where({'deceased.name':name});
    }
    if(last_name){
      query.where({'deceased.last_name':last_name})
    }

    add_date_cretaria(query,birth_date_after,"deceased.birth_date",'>=');
    add_date_cretaria(query,birth_date_before,"deceased.birth_date",'<=');
    add_date_cretaria(query,birth_date,"deceased.birth_date");
    add_date_cretaria(query,death_date_after,"deceased.death_date",'>=');
    add_date_cretaria(query,death_date_before,"deceased.death_date",'<=');
    add_date_cretaria(query,death_date,"deceased.death_date");

    query.exec(function found_ads(err,data){
      if(err) return next({err:err});
      res.send(data);
    })
  },  
};

function add_date_cretaria(query,date,field,range){
  if(!date) return;

  var dateObj = new Date(date)
    , whereObj = {};

  if(_.isDate(dateObj) && !isNaN(dateObj.getTime())){
    if(range){
      whereObj[field]={};
      whereObj[field][range]=dateObj.toISOString();
    }else{
      whereObj[filed] = dateObj.toISOString();
    }
    query.where(whereObj);
  }
}