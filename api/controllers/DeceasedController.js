/**
 * DeceasedController
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
  , path = require('path');


module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to DeceasedController)
   */
  _config: {},


  uploadPhoto:function(req,res,next){
    if(!("photo" in req.files)|| Array.isArray(req.files.photo)){
      return res.send(400,{error:"No photo uploaded"});
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

    filename = uuid  + extension;

    var uploader = s3_client.upload(photo.path, filename,headers);

    uploader.on("error", function file_upload_error(err){
      clean_fs(photo);
      res.send(500,{error:err});
    });

    uploader.on("end",function file_uploaded(){
      clean_fs(photo);
      res.send({filename:filename});
    });


    function clean_fs(photo){
      fs.unlink(photo.path);
    }
  }

  
};
