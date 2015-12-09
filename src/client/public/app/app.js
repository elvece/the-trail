angular.module('myApp', ['uiGmapgoogle-maps','routes', 'directives', 'factories'])
  .run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        // $rootScope.title = current.$$route.title;
    });
  })
  .config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode({
      enabled: false,
      requirebase: false
    });
  }]);

