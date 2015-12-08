var app = angular.module('myApp');

app.controller('geoHikeController', ['$scope', '$routeParams', 'hikeFactory', function($scope, $routeParams, hikeFactory){

    $scope.hikeId = $routeParams.hikeId;
    $scope.hikeName = $routeParams.hikeName;

    hikeFactory.getHike($scope.hikeId)
      .then(function(data){
        $scope.hikeComments = data.data.stream[0].comments;
        $scope.stream = data.data.stream[0]._id;
        // console.log(data);
      });
}]);

