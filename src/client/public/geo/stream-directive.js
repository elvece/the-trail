angular.module('directives')
  .directive('liveStream', ['streamFactory', function(streamFactory){
    return {
      restrict: 'E',
      templateUrl: 'geo/stream.html',
      controller: function($scope, streamFactory){
        var socket = io.connect();
      }
    };
  }]);
