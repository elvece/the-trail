angular.module('directives')
  .directive('geoHikeTemplate', ['hikeFactory', '$routeParams', function(hikeFactory){
    return {
      restrict: 'E',
      templateUrl: 'hike/geo-hike.html',
      controller: function(hikeFactory, $routeParams){

        $scope.hikeId = $routeParams.hikeId;
        console.log($scope.hikeId)
      }
    };
  }]);

