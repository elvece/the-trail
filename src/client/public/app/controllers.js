var app = angular.module('myApp');

app.controller('myController', ['$scope', '$routeParams', 'hikeFactory', function($scope, $routeParams, hikeFactory){

    $scope.title = "The Trail";
    $scope.action = {};
    $scope.action.bootstrap = "";
    $scope.action.message = "";

    hikeFactory.getAllHikes()
      .then(function(res){
        $scope.hikes = res.data;
          // console.log($scope.hikes);
      });
}]);


