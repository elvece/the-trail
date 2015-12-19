var app = angular.module('routes', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl: '../views/index.html'
  })
  .when('/generator', {
    templateUrl: '../views/generator.html'
  })
  .when('/hike/:hikeId/:hikeName', {
    templateUrl: '../views/one-hike.html'
  })
  .when('/hikes/all', {
    templateUrl: '../views/all-hikes.html'
  })
  .when('/geo/share', {
    templateUrl: '../views/geo-share.html'
  })
  .when('/geo/share/:hikeId/:hikeName', {
    templateUrl: '../geo/hike/geo-hike.html',
    controller: 'geoHikeController'
  })
  .otherwise({redirectTo: '/'});
}]);


