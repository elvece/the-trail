angular.module('directives')
  .directive('liveStream', ['streamFactory', function(streamFactory){
    return {
      restrict: 'E',
      templateUrl: 'geo/stream.html',
      controller: function($scope, streamFactory){
        //leave localhost direct connection for local development, take out for heroku
        var socket = io.connect('http://localhost:3000');
        var streamBoard = angular.element(document.querySelector('#stream-board'));
        var currentUsers = angular.element(document.querySelector('#current-users'));
        //hard coded to start, will need to be dynamic based on hike currently displayed
        var streamID = '5663911fe0b9daf610a36123';
        var user;

        // socket.on('hi', function(data){
        //   console.log(data);
        //   //then can emit another event
        // });

        socket.emit('entered', user);
        displayStream();


        socket.on('current-users', function(users){
          //populate currentUsers list
          currentUsers.empty();
          for (var i = 0; i < users.length; i++) {
            currentUsers.append('<li>'+users[i]+'</li>');
          }
        });

        function displayStream(){
          streamBoard.empty();
          streamFactory.getStream(streamID)
            .then(function(data){
              console.log(data.data.comments);
            });
        }
      }
    };
  }]);
