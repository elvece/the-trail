angular.module('directives')
  .directive('navTemplate', [function(){
    return {
      restrict: 'A',
      templateUrl: 'nav/nav.html'
    };
  }]);

