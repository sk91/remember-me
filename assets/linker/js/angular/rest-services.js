(function(angular){
  'use strict';
  var ad_factory = function($resource,Deceased){
    var Ad = $resource("/ads/:id",{id:"@id"});

    Ad.prototype.getDeceased=function(cb){
      return Deceased.get({id:this.deceased.id},cb);
    };

    Ad.prototype.getAuthor = function(cb){
      return User.get({id:this.author.id},cb);
    };

    return Ad;
  };


  var deceased_factory = function($resource,User){
    var Deceased = $resource("/deceaseds/:id",{id:"@id"});
    Deceased.prototype.getResponsible = function(cb){
      return User.get({id:this.responsible.id},cb);
    };

    return Deceased;
  };

  var user_factory = function($resource){
    var User = $resource("/users/:id",{id:"@id"});
    return User;
  };

  var category_factory = function($resource){
    var Category = $resource("/categorys/:id",{id:"@id"});
    return Category;
  };

  var article_factory = function($resource){
    var Article = $resource("/articles/:id",{id:"@id"});
    return Article;
  };


  angular.module('MyApp.restServices',['ngResource'])
    .factory("Ad",['$resource',"Deceased",ad_factory])
    .factory("Deceased",['$resource', 'User',deceased_factory])
    .factory("User",['$resource', user_factory])
    .factory("Category",['$resource',category_factory])
    .factory("Article",['$resource', article_factory]);

    
})(angular);  