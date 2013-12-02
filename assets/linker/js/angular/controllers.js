(function(angular){
  'use strict';


  angular.module("MyApp.controllers",[])
    .controller('MainCtrl',['$scope','$rootScope','$window','$location',main_controller])
    .controller('AdsCtrl',['$scope','$rootScope','Ad',ads_controller])
    .controller('AdDetailsCtrl',['$scope','$rootScope','$routeParams','Ad', ad_details_controller])
    .controller('DeceasedProfileCtrl',['$scope','$rootScope','$routeParams','Deceased',deceased_profile]);


    function main_controller($scope,$rootScope,$window,$location){
      $scope.slide='';
      $rootScope.title = "Dead People"

      $rootScope.back = function(){
        $scope.slide = 'slide-right';
        $rootScope.nav='';
        $window.history.back();
      }

      $rootScope.go = function(path){
        $scope.slide='slide-left';
        $rootScope.nav='';
        $location.url(path);
      }

      $rootScope.toggle_menu = function(){
        if($rootScope.nav == "left-nav"){
          $rootScope.nav = '';
        }else{
          $rootScope.nav = "left-nav";
        }
      }

      $rootScope.isActive = function(path){
        if ($location.path().substr(0, path.length) == path) {
          return "is-active";
        } else {
          return "";
        }
      }

    }


    function ads_controller($scope,$rootScope,Ad){
      $scope.ads = Ad.query();
      $rootScope.title = "Ads";
    }

    function ad_details_controller($scope,$rootScope,$routeParams,Ad){
      $scope.ad = Ad.get({id:$routeParams.id});
      if($scope.ad.type == 'obit'){
        $rootScope.title = "Obit";
      }else{
        $rootScope.title = "Sympathy";
      }

      
    }

    function deceased_profile($scope,$rootScope,$routeParams,Deceased){
      $scope.deceased = Deceased.get({id:$routeParams.id});
      $rootScope.title = "Deceased profile";
    }


})(angular);


