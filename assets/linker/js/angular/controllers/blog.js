(function(angular){
  'use strict';

  var BlogController = {
    "article": function($scope,$rootScope,$routeParams, Category, Article){
      $rootScope.title = "Article";
      $rootScope.resetButtons(['back']);

      $scope.article = Article.get({id:$routeParams.id});
    },

    "category": function($scope,$rootScope,$routeParams, Category, Article){
      
      $rootScope.resetButtons(['back']);
  
      $scope.category = Category.get({id:$routeParams.id},function(category){
        $rootScope.title = category.name;
      });
      
      $scope.sub_categories = Category.query({father:$routeParams.id});
      $scope.articles = Article.query({category:$routeParams.id});
    } 
  }


  angular.module("MyApp.controllers")
    .controller('ArticleCtrl',['$scope','$rootScope','$routeParams','Category', 'Article',BlogController.article])
    .controller('CategoryCtrl',['$scope','$rootScope','$routeParams','Category', 'Article',BlogController.category]);
})(angular);