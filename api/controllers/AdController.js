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

var s3 = require("s3")
  , UUIDGenerator = require('node-uuid')
  , _ = require('lodash')
  , fs = require('fs')
  , path = require('path')
  , async = require('async');

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AdController)
   */
  _config: {},


  find:function(req,res,next){

    var id = req.param('id')
      , full_name = req.param('full_name')
      , name = req.param('name')
      , type = req.param('type')
      , last_name = req.param('last_name')
      , death_date_before= req.param('death_date_before')
      , death_date_after = req.param('death_date_after')
      , death_date = req.param('death_date')
      , birth_date_before= req.param('birth_date_before')
      , birth_date_after = req.param('birth_date_after')
      , birth_date = req.param('birth_date')
      , query = Ad.find();

    if(id){
      return Ad.findOne({id:id}, function found_ad(err,data){
        if(err) return next({err:err});
        if(!data){
          return res.send(404);
        }
        res.json(data.toJSON());
      });
    }

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
    if(type){
      query.where({'details.type':type});
    }

    add_date_cretaria(query,birth_date_after,"deceased.birth_date",'>=');
    add_date_cretaria(query,birth_date_before,"deceased.birth_date",'<=');
    add_date_cretaria(query,birth_date,"deceased.birth_date");
    add_date_cretaria(query,death_date_after,"deceased.death_date",'>=');
    add_date_cretaria(query,death_date_before,"deceased.death_date",'<=');
    add_date_cretaria(query,death_date,"deceased.death_date");

    query.exec(function found_ads(err,ads){
      if(err) return next({err:err});
      var json_ads = [];

      ads.forEach(function(ad){
        json_ads.push(ad.toJSON());
      })
      res.json(json_ads);
    })
  },

  create:function(req,res,next){
    var ad;
    if(req.is('json')){
      ad = req.params.all();
    }else{
      ad= JSON.parse(req.param('data'));
    }

    if(!req.files || !("photo" in req.files) || !ad.details || ad.details.type!=='sympathy'){
      return create_ad();
    }

    var photo = req.files.photo
      , s3_client = s3.createClient({
          key:sails.config.aws.s3_key,
          secret:sails.config.aws.s3_secret,
          bucket:sails.config.aws.s3_bucket
        })
      , extension = path.extname(photo.name)
      , uuid = UUIDGenerator.v1()
      , filename
      , headers;

      if(!_.contains(sails.config.file.image_content_types,photo.headers['content-type'])){
        clean_fs(photo);
        return res.send(400,{"error":"Invalid content type"});
      }
      if(!_.contains(sails.config.file.image_extensions,extension)){
        clean_fs(photo);
        return res.send(400,"Invalid extension type");
      }

      headers = {
        "Content-Type": photo.headers['content-type']
      };

      filename = sails.config.aws.ad_image_path.replace(':name',uuid  + extension) ;

      var uploader = s3_client.upload(photo.path, filename,headers);

      uploader.on("error", function file_upload_error(err){
        clean_fs(photo);
        res.send(500,{error:err});
      });

      uploader.on("end",function file_uploaded(){
        clean_fs(photo);
        ad.details.from['photo']=filename;
        create_ad();
      });

      function remove_from_s3(photo){
        if(!photo || photo === "") return;
        s3_client.knox.deleteFile(photo,function(){});
      }
      function clean_fs(photo){
        fs.unlink(photo.path);
      }

      function create_ad(){
        Ad.create(ad,function(err,created){
          if(err){
             remove_from_s3(filename);
             return res.send(500,{error:err})
          } 
          res.json(created.toJSON());
        });
    }
  }
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