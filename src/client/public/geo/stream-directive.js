angular.module('directives')
  .directive('liveStream', ['streamFactory', function(streamFactory){
    return {
      restrict: 'E',
      templateUrl: 'geo/stream.html',
      controller: function($scope, streamFactory){
        var socket = io.connect();
        socket.on('hi', function(data){
          console.log(data);
          //then can emit another event
        });
      }
    };
  }]);
