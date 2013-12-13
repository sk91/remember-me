(function(angular){
  'use strict';

  var AdsController = {
    "list":function($scope,$rootScope,Ad){
      $rootScope.title = "Ads";
      $rootScope.resetButtons(['add']);

      $scope.ad_filter_selected = 'all';

      $rootScope.add = function(){
        $rootScope.go('/ads/new');
      }

      $scope.choose_ad_filter = function(filter){
        $scope.ad_filter_selected = filter;
      }

      $scope.filterAds = function(ad){
        if($scope.ad_filter_selected === 'all'){
          return true;
        }
        if(!ad.details || !ad.details.type){
          return false;
        }
        return $scope.ad_filter_selected === ad.details.type;
      }

      $rootScope.toogleFilter=function(){
        $scope.toggle_filter=!$scope.toggle_filter;
      }

      $scope.ads = Ad.query();
      $scope.toggle_filter = false;
      
    },
    "one":function($scope,$rootScope,$routeParams,Ad,Deceased){
      $rootScope.resetButtons(['back']);
      $scope.deceased=null;
      $scope.ad = Ad.get({id:$routeParams.id},function(ad){
        if(ad.details.type === "deceased"){
          go("/deceased/"+ ad.deceased.id);
        }
        if(ad.details.type == 'obit'){
          $rootScope.title = "Obit";
        }else{
          $rootScope.title = "Sympathy";
        }
        $scope.deceased= ad.deceased;
      });
    },
    "new": function($scope,$rootScope,$routeParams,Ad,Deceased){
      $rootScope.resetButtons(['back']);
      $rootScope.title ="Write ad";
      $scope.deceased = false;
      if($routeParams.deceased){
        $scope.deceased =  Deceased.get({'id':$routeParams.deceased});
      }

      $scope.createDeceased = function(new_deceased){
        var deceased = angular.copy(new_deceased);
        deceased = new Deceased(deceased);
        deceased.create(function(u,headers){
          if(!("status" in u)){
            $rootScope.go("/ads/new/" + u.id);
          }
        });
      }
    },
    "newObit":function($scope,$rootScope, $routeParams,Ad, Deceased){
      $rootScope.resetButtons(['back']);
      $rootScope.title ="Create obit ad";

      $scope.deceased = Deceased.get({id:$routeParams.deceased});
      $scope.ad = {};

      $scope.createAd = function(){
        console.log($scope.ad, $scope.deceased);
      }
    },

    "newSympathy":function($scope,$rootScope,$routeParams,$upload,Ad,Deceased){
      $rootScope.resetButtons(['back']);
      $rootScope.title ="Create sympathy ad";
      $scope.deceased = Deceased.get({id:$routeParams.deceased});
      $scope.name = "";
      $scope.last_name ="";
      $scope.phone = "";
      $scope.message = "";
      $scope.image = "";

      $scope.onFileSelect = function($files){
        $scope.img = $files[0];
      }

      $scope.createAd = function(){
        var ad = {
          details:{
            type:"sympathy",
            from:{
              name:$scope.name,
              last_name:$scope.last_name,
              phone:$scope.phone,
              photo:$scope.image
            },
            message:$scope.message
          },
          deceased:{
            id:$scope.deceased.id
          }
        };
        if($scope.img){
          $scope.upload= $upload.upload({
            method:"POST",
            url:"/ads/",
            file:$scope.img,
            fileFormDataName:"photo",
            data:{data:ad}
          }).progress(function(evt){
            $scope.progress =parseInt(100 * evt.loaded / evt.total);
          }).success(function(ad,status,headers,config){
            if(status == 200){
              $rootScope.go('/ads/' + ad.id);
            }
          }).then(function(){
            $scope.upload = false;
            $scope.progress= 0;
          });
        }else{
          Ad.create(ad,function(ad,headers){
            if(!('status' in ad)){
              $rootScope.go('/ads/' + ad.id);
            }
          })
        }
      }
    }
    

  };


  angular.module("MyApp.controllers")
    .controller('AdsCtrl',['$scope','$rootScope','Ad',AdsController.list])
    .controller('AdDetailsCtrl',['$scope','$rootScope','$routeParams','Ad', "Deceased", AdsController.one])
    .controller('NewAdCtrl',['$scope','$rootScope','$routeParams','Ad', 'Deceased',AdsController.new])
    .controller('CreateObitCtrl',['$scope','$rootScope','$routeParams','Ad', 'Deceased',AdsController.newObit])
    .controller('CreateSympathyCtrl',['$scope','$rootScope','$routeParams','$upload','Ad', 'Deceased',AdsController.newSympathy])
  

})(angular);