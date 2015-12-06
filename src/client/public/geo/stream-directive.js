angular.module('directives')
  .directive('liveStream', ['streamFactory', function(streamFactory){
    return {
      restrict: 'E',
      templateUrl: 'geo/stream.html',
      controller: function($scope, streamFactory){
        //leave localhost direct connection for local development, take out for heroku
        var socket = io.connect('http://localhost:3000');
        socket.on('hi', function(data){
          console.log(data);
          //then can emit another event
        });
      }
    };
  }]);
