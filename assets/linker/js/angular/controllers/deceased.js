(function(angular){
  "use strict";

  var DeceasedController = {
    "chooser":function($scope,$rootScope,Deceased){
      $scope.title = "Person Chooser";
      $scope.resetButtons(['back','add']);

      $rootScope.add = function(){
        $rootScope.go('/ads/new');
      }
      $scope.deceaseds = Deceased.query();
    },

    "profile":function($scope,$rootScope,$routeParams,Deceased){
      $rootScope.resetButtons(['back','add']);
      $rootScope.add = function(){
        $rootScope.go("/ads/new/" + $scope.deceased.id);
      }
      $scope.deceased = Deceased.get({id:$routeParams.id});
      Deceased.get({id:$routeParams.id},function(deceased){
        deceased.birth_date = new Date(deceased.birth_date);
        deceased.death_date = new Date(deceased.death_date);  
        $scope.deceased = deceased;
      });
      $rootScope.title = "Deceased profile";
    },

    "edit": function($scope,$rootScope,$routeParams,$upload,Deceased){
      $rootScope.resetButtons(['back']);
      $rootScope.title = "Deceased edit";

      $scope.upload = false;
      $scope.progress= 0;
      
      $scope.birth_address_details = "";
      $scope.birth_address_options = null;
      $scope.death_address_details = "";
      $scope.death_address_options = {
        country:'il'
      };

      $scope.deceased=null;

      Deceased.get({id:$routeParams.id},function(deceased){
        deceased.birth_date = moment(deceased.birth_date).format("YYYY-MM-DD");
        deceased.death_date = moment(deceased.death_date).format("YYYY-MM-DD");
        $scope.deceased = deceased;
      });

      $scope.onFileSelect = function($files){
        $scope.upload= $upload.upload({
          method:"POST",
          url:"/deceaseds/"+$scope.deceased.id + "/photo",
          file:$files[0],
          fileFormDataName:"photo",
        }).progress(function(evt){
          $scope.progress =parseInt(100 * evt.loaded / evt.total);
        }).success(function(data,status,headers,config){
          if(status == 200){
            $scope.deceased.photo = data.photo;
          }
        }).then(function(){
          $scope.upload = false;
          $scope.progress= 0;
        });
      }

      $scope.saveDeceased = function(deceased){
        console.log(deceased);
        deceased.$update(function(deceased,headers){
          $rootScope.go('/ads/new/'+deceased.id);
        });
      }
    }
  }

  angular.module("MyApp.controllers")
    .controller('DeceasedProfileCtrl',['$scope','$rootScope','$routeParams','Deceased',DeceasedController.profile])
    .controller('DeceasedEditCtrl',['$scope','$rootScope','$routeParams','$upload','Deceased',DeceasedController.edit])
    .controller("DeceasedChooserCtrl",['$scope',"$rootScope",'Deceased',DeceasedController.chooser]);
})(angular);