angular.module('directives')
  .directive('liveStream', ['streamFactory', function(streamFactory){
    return {
      restrict: 'E',
      templateUrl: 'geo/stream.html',
      controller: function($scope, streamFactory){
        //leave localhost direct connection for local development, take out for heroku
        var socket = io.connect('http://localhost:3000');
        var streamBoard = angular.element(document.querySelector('#chat-ul'));
        var onlineUsers = angular.element(document.querySelector('#user-ul'));

        // socket.on('hi', function(data){
        //   console.log(data);
        //   //then can emit another event
        // });

        socket.on('entered', function(data){
          //display current users
        });


        function displayStream(){

        }
      }
    };
  }]);
