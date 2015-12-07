var app = angular.module('myApp');

app.controller('geoHikeController', ['$scope', '$routeParams', 'hikeFactory', function($scope, $routeParams, hikeFactory){

    $scope.hikeId = $routeParams.hikeId;
    $scope.hikeName = $routeParams.hikeName;

    hikeFactory.getHike($scope.hikeId).then(function(data){
      console.log(data.data)
      console.log(data.data.comments[0])
    });
}]);

