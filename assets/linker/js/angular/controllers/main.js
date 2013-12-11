(function(angular){
  'use strict';

  var MainController = {
    main:function($scope,$rootScope,$window,$location,Config){
      $scope.slide='';
      $rootScope.title = "Dead People"
      $rootScope.buttons={};

      $rootScope.staticUrl = function(object){
        if(!object || object === ""){
          object = $rootScope.main_config.default_deceased_image;
        }
        if(/^(http:|https:|)\/\//.test(object)){
          return object;
        }
        return $rootScope.main_config.static_url + object;
      }

      $rootScope.personChooser = {
        next:null
      };

      $rootScope.main_config = Config.get({name:'name'});

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
      $rootScope.resetButtons = function(buttons){
        $rootScope.buttons={};
        for(var i=0;i<buttons.length;i++){
          $rootScope.buttons[buttons[i]] = true;
        }
      }

      $scope.choosePerson = function(next,deceased){
        var url = '/deceased/chooser';
        url += (deceased)? '/'+ deceased.id:'';

        if(!next){
          next = $location.path();
        }
        $rootScope.personChooser.next = next;
        $rootScope.go(url);
      }

      $rootScope.isActive = function(path){
        if ($location.path().substr(0, path.length) == path) {
          return "is-active";
        } else {
          return "";
        }
      }

      $rootScope.add = function(){
        
      }
      $rootScope.toogleFilter = function(){
        alert('filter');
      }
    }
  };
  angular.module("MyApp.controllers")
    .controller('MainCtrl',['$scope','$rootScope','$window','$location','Config',MainController.main]);
    
})(angular);