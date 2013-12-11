/**
 * ConfigController
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

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ConfigController)
   */
  _config: {},

  find:function(req,res){
    res.send({
      name:"main",
      static_url:sails.config.aws.cf_url,
      default_deceased_image: sails.config.aws.deceased_image_path.replace(':name','default.jpg'),
      menu:[
        {
          path:"/ads",
          label:"Main"
        },{
          path:'/category/52a834a472b9d89814000002',
          label:"Information",
        },{
          path:'/category/52a8349672b9d89814000001',
          label:"Services"
        }
        
      ]
    });
  }

  
};
