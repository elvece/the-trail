var app = angular.module('myApp');

app.controller('myController', ['$scope', function($scope){

    $scope.title = "The Trail";
    $scope.action = {};
    $scope.action.bootstrap = "";
    $scope.action.message = "";
}]);

