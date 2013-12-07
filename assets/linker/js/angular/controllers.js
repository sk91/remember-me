(function(angular){
  'use strict';


  angular.module("MyApp.controllers",[])
    .controller('MainCtrl',['$scope','$rootScope','$window','$location',main_controller])
    .controller('AdsCtrl',['$scope','$rootScope','Ad',ads_controller])
    .controller('AdDetailsCtrl',['$scope','$rootScope','$routeParams','Ad', "Deceased", ad_details_controller])
    .controller('NewAdCtrl',['$scope','$rootScope','$routeParams','Ad', 'Deceased',new_ad_controller])
    .controller('CreateObitCtrl',['$scope','$rootScope','Ad',create_obit_controller])
    .controller('CreateSympathyCtrl',['$scope','$rootScope','Ad',create_sympathy_controller])
    .controller('DeceasedProfileCtrl',['$scope','$rootScope','$routeParams','Deceased',deceased_profile_controller])
    .controller('DeceasedEditCtrl',['$scope','$rootScope','$routeParams','Deceased',deceased_edit_controller])
    .controller("DeceasedChooserCtrl",['$scope',"$rootScope",'Deceased',deceased_chooser_controller])
    .controller('ArticleCtrl',['$scope','$rootScope','$routeParams','Category', 'Article',article_controller])
    .controller('AccountCtrl',['$scope','$rootScope',account_controller])
    .controller('CategoryCtrl',['$scope','$rootScope','$routeParams','Category', 'Article',category_controller]);


    function main_controller($scope,$rootScope,$window,$location){
      $scope.slide='';
      $rootScope.title = "Dead People"
      $rootScope.buttons={};
      $rootScope.personChooser = {
        next:null
      };

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


       $rootScope.ad_filter_selected = 'all';
    }


    function ads_controller($scope,$rootScope,Ad){
      $rootScope.title = "Ads";
      $rootScope.resetButtons(['add']);
      $rootScope.add = function(){
        $rootScope.go('/ads/new');
      }

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

      $scope.ads = Ad.query();
      $scope.toggle_filter = false;
      
    }

    function new_ad_controller($scope,$rootScope,$routeParams,Ad,Deceased){
      $rootScope.resetButtons(['cancel']);
      $rootScope.title ="Write ad"
      $scope.deceased = false
      if($routeParams.deceased){
        $scope.deceased =  Deceased.get({'id':$routeParams.deceased});
      }

      $scope.createDeceased = function(){
        alert('Create new deceased');
      }
    }
    

    function create_obit_controller($scope,$rootScope,Ad){
      $rootScope.resetButtons(['back']);
      $rootScope.title ="Create obit ad";
    }

    function create_sympathy_controller($scope,$rootScope,Ad){
      $rootScope.resetButtons(['back']);
      $rootScope.title ="Create sympathy ad";
    }

    function ad_details_controller($scope,$rootScope,$routeParams,Ad,Deceased){
      $rootScope.resetButtons(['back']);
      $scope.deceased=null;

      $scope.ad = Ad.get({id:$routeParams.id},function(ad){
        if(ad.details.type == 'obit'){
          $rootScope.title = "Obit";
        }else{
          $rootScope.title = "Sympathy";
        }
        $scope.deceased= ad.deceased;
        Deceased.get({id:ad.deceased.id},function(deceased){
          $scope.deceased = deceased;
        });
      });
      

      
    }

    function deceased_profile_controller($scope,$rootScope,$routeParams,Deceased){
      $rootScope.resetButtons(['back','add']);
      $rootScope.add = function(){
        $rootScope.go("/ads/new/" + $scope.deceased.id);
      }
      $scope.deceased = Deceased.get({id:$routeParams.id});
      $rootScope.title = "Deceased profile";
    }
     function deceased_edit_controller($scope,$rootScope,$routeParams,Deceased){
      $rootScope.resetButtons(['back']);
      $scope.deceased = Deceased.get({id:$routeParams.id});
      $rootScope.title = "Deceased edit";
    }

    function deceased_chooser_controller($scope,$rootScope,Deceased){
      $scope.title = "Person Chooser";
      $scope.resetButtons(['cancel']);
      $scope.deceaseds = Deceased.query();
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


