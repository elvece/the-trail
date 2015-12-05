angular.module('directives')
  .directive('liveStream', ['streamFactory', function(){
    return {
      restrict: 'E',
      templateUrl: 'geo/stream.html',
      controller: function($scope, streamFactory){


      }
    };
  }]);
