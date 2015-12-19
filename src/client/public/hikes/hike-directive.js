angular.module('directives')
  .directive('hikeTemplate',['hikeFactory', function($scope,$routeParams, hikeFactory){
    return {
      restrict: 'A',
      templateUrl: 'hikes/hike.html',
      controller: function($scope, $routeParams, hikeFactory){
        console.log($routeParams.hikeId);
        hikeFactory.getHike($routeParams.hikeId)
          .then(function(data){
            console.log(data);
          });
      }
    };
  }]);
