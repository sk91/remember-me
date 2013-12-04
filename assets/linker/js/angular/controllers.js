(function(angular){
  'use strict';


  angular.module("MyApp.controllers",[])
    .controller('MainCtrl',['$scope','$rootScope','$window','$location',main_controller])
    .controller('AdsCtrl',['$scope','$rootScope','Ad',ads_controller])
    .controller('AdDetailsCtrl',['$scope','$rootScope','$routeParams','Ad', ad_details_controller])
    .controller('NewAdCtrl',['$scope','$rootScope','Ad',new_ad_controller])
    .controller('DeceasedProfileCtrl',['$scope','$rootScope','$routeParams','Deceased',deceased_profile])
    .controller('ArticleCtrl',['$scope','$rootScope','$routeParams','Category', 'Article',article_controller])
    .controller('AccountCtrl',['$scope','$rootScope',account_controller])
    .controller('CategoryCtrl',['$scope','$rootScope','$routeParams','Category', 'Article',category_controller]);


    function main_controller($scope,$rootScope,$window,$location){
      $scope.slide='';
      $rootScope.title = "Dead People"
      $rootScope.buttons={};

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

      $rootScope.isActive = function(path){
        if ($location.path().substr(0, path.length) == path) {
          return "is-active";
        } else {
          return "";
        }
      }

      $rootScope.add = function(){
        alert("add");
      }
      $rootScope.toogleFilter = function(){
        alert('filter');
      }


       $rootScope.ad_filter_selected = 'all';
    }


    function ads_controller($scope,$rootScope,Ad){
      $rootScope.title = "Ads";
      $rootScope.resetButtons(['filter','add']);
  


      $scope.choose_ad_filter = function(filter){
        $rootScope.ad_filter_selected = filter;
      }

      $scope.filterAds = function(ad){
        if($scope.ad_filter_selected === 'all'){
          return true;
        }
        return $scope.ad_filter_selected === ad.details.type;
      }

      $rootScope.toogleFilter=function(){
        $scope.toggle_filter=!$scope.toggle_filter;
      }

      $scope.ads = [];
      $scope.toggle_filter = false;

      Ad.query(function(ads){
        _(ads).each(function(ad){
          ad.getDeceased(function(deceased){
            ad.deceased = deceased;
            $scope.ads.push(ad);
          });
        });
      });
      
    }

    function new_ad_controller($scope,$rootScope,Ad){
      $rootScope.resetButtons(['cancel']);
      $rootScope.title ="Write ad"
    }
  

    function ad_details_controller($scope,$rootScope,$routeParams,Ad){
      $rootScope.resetButtons(['back']);
      $scope.ad = Ad.get({id:$routeParams.id},function(ad){
        ad.getDeceased(function(deceased){
            $scope.ad.deceased=deceased;
        });
        if(ad.details.type == 'obit'){
          $rootScope.title = "Obit";
        }else{
          $rootScope.title = "Sympathy";
        }
      });
      

      
    }

    function deceased_profile($scope,$rootScope,$routeParams,Deceased){
      $rootScope.resetButtons(['back']);
      $scope.deceased = Deceased.get({id:$routeParams.id});
      $rootScope.title = "Deceased profile";
    }



    function article_controller($scope,$rootScope,$routeParams, Article, Category){
      $rootScope.title = "Article";
      $rootScope.resetButtons(['back']);
    }

     function category_controller($scope,$rootScope,$routeParams, Article, Category){
      $rootScope.title = "Category";
      $rootScope.resetButtons(['back']);
    }


    function account_controller($scope,$rootScope){
      $rootScope.title = "Account";
      $rootScope.resetButtons(['back']);
    }


})(angular);


