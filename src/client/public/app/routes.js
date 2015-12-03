var app = angular.module('routes', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl: '../views/index.html'
  });
  // .when('/hike', {
  //   templateUrl: '../views/hike.html'
  // })
  // .when('/hike/all', {
  //   templateUrl: '../views/all.html'
  // });
}]);


