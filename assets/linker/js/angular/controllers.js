(function(angular){
  'use strict';


  angular.module("MyApp.controllers",[])
    .controller('MainCtrl',['$scope','$rootScope','$window','$location','Config',main_controller])
    .controller('AdsCtrl',['$scope','$rootScope','Ad',ads_controller])
    .controller('AdDetailsCtrl',['$scope','$rootScope','$routeParams','Ad', "Deceased", ad_details_controller])
    .controller('NewAdCtrl',['$scope','$rootScope','$routeParams','Ad', 'Deceased',new_ad_controller])
    .controller('CreateObitCtrl',['$scope','$rootScope','$routeParams','Ad', 'Deceased',create_obit_controller])
    .controller('CreateSympathyCtrl',['$scope','$rootScope','$routeParams','Ad', 'Deceased',create_sympathy_controller])
    .controller('DeceasedProfileCtrl',['$scope','$rootScope','$routeParams','Deceased',deceased_profile_controller])
    .controller('DeceasedEditCtrl',['$scope','$rootScope','$routeParams','$upload','Deceased',deceased_edit_controller])
    .controller("DeceasedChooserCtrl",['$scope',"$rootScope",'Deceased',deceased_chooser_controller])
    .controller('ArticleCtrl',['$scope','$rootScope','$routeParams','Category', 'Article',article_controller])
    .controller('AccountCtrl',['$scope','$rootScope',account_controller])
    .controller('CategoryCtrl',['$scope','$rootScope','$routeParams','Category', 'Article',category_controller]);


    function main_controller($scope,$rootScope,$window,$location,Config){
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


    function ads_controller($scope,$rootScope,Ad){
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
      
    }

    function new_ad_controller($scope,$rootScope,$routeParams,Ad,Deceased){
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
    }
    

    function create_obit_controller($scope,$rootScope, $routeParams,Ad, Deceased){
      $rootScope.resetButtons(['back']);
      $rootScope.title ="Create obit ad";

      $scope.deceased = Deceased.get({id:$routeParams.deceased});
      $scope.ad = {};

      $scope.createAd = function(){
        console.log($scope.ad, $scope.deceased);
      }

    }

    function create_sympathy_controller($scope,$rootScope,$routeParams,Ad,Deceased){
      $rootScope.resetButtons(['back']);
      $rootScope.title ="Create sympathy ad";
      $scope.deceased = Deceased.get({id:$routeParams.deceased});
      $scope.name = "";
      $scope.last_name ="";
      $scope.phone = "";
      $scope.message = "";
      $scope.image = "";


      $scope.uploadImage = function(){

      }

      $scope.createAd = function(){

      }
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
      Deceased.get({id:$routeParams.id},function(deceased){
        deceased.birth_date = new Date(deceased.birth_date);
        deceased.death_date = new Date(deceased.death_date);  
        $scope.deceased = deceased;
      });
      $rootScope.title = "Deceased profile";
    }
     function deceased_edit_controller($scope,$rootScope,$routeParams,$upload,Deceased){
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
          fileFormDataName:"photo"
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

    function deceased_chooser_controller($scope,$rootScope,Deceased){
      $scope.title = "Person Chooser";
      $scope.resetButtons(['back','add']);

      $rootScope.add = function(){
        $rootScope.go('/ads/new');
      }
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


