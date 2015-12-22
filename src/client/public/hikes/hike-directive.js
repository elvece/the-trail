angular.module('directives')
  .directive('hikeTemplate',['hikeFactory', function($scope,$routeParams, hikeFactory){
    return {
      restrict: 'A',
      templateUrl: 'hikes/hike.html',
      controller: function($scope, $routeParams, hikeFactory){
        $scope.hikeId = $routeParams.hikeId;
        hikeFactory.getHike($scope.hikeId)
          .then(function(data){
            console.log(data.data);
            $scope.hikeName = data.data.name;
            $scope.features = data.data.features;
            $scope.images = data.data.images;
            $scope.info = data.data.info;
            $scope.location = data.data.location;
            $scope.coordinates = data.data.map;
          });
      }
    };
  }]);
