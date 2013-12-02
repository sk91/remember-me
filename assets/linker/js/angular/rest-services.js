(function(angular){
  'use strict';

  angular.module('MyApp.restServices',['ngResource'])
    .factory("Ad",['$resource',
        function($resource){
          return $resource("/ads/:id",{});
        }
      ])
})(angular);  