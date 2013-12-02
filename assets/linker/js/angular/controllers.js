(function(angular){
  'use strict';


  angular.module("MyApp.controllers",[])
    .controller('MainCtrl',['$scope','$rootScope','$window','$location',main_controller])
    .controller('AdListCtrl',['$scope','Ad',ad_list_controller]);


    function main_controller($scope,$rootScope,$window,$location){
      $scope.slide='';
      $rootScope.back = function(){
        $scope.slide = 'slide-right';
        $window.history.back();
      }

      $rootScope.go = function(path){
        $scope.slid='slide-left';
        $location.url(path);
      }

    }


    function ad_list_controller($scope,Ad){
      $scope.ads = Ad.query();
    }


})(angular);


