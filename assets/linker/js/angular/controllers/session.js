(function(angular){
  'use strict';

  var SessionController = {
    "login": function(){

    },

    "register": function(){

    },

    "account":function(){

    }
  };


  angular.module("MyApp.controllers")
    .controller('SessionLoginCtrl',['$scope','$rootScope', 'Session',SessionController.login])
    .controller('SessionLogoutCtrl',['$scope','$rootScope','Session',SessionController.register]);


})(angular);
