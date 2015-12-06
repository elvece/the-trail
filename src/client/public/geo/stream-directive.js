angular.module('directives')
  .directive('liveStream', ['streamFactory', function(streamFactory){
    return {
      restrict: 'E',
      templateUrl: 'geo/stream.html',
      controller: function($scope, streamFactory){
        //leave localhost direct connection for local development, take out for heroku
        var socket = io.connect('http://localhost:3000');
        //to populate view
        var streamBoard = angular.element(document.querySelector('#stream-board'));
        var currentUsers = angular.element(document.querySelector('#current-users'));
        //hard coded to start, will need to be dynamic based on hike currently displayed
        var streamID = '5664a3580b24c19105f4a9bc';
        var user = "julian";

        // *** HELPER FUNCTIONS *** //
        function userInZone(){
          // socket.emit('entered', user);
          displayStream();
        }

        function displayStream(){
          streamBoard.empty();
          streamFactory.getStream(streamID)
            .then(function(data){
              console.log(data.data.comments);
              var comments = data.data.comments;
              var message = comments.message;
              var location = comments.location;
              var user = comments.user;
              for (var i = 0; i < 30; i++) {
                if (comments[i]) {
                  streamBoard.append('<li>'+comments[i].user+ ': '+comments[i].message+'</li>');
                }
              }
            });
        }
        userInZone();

        // *** SOCKET REQUESTS *** //
        // socket.on('current-users', function(users){
        //   //populate currentUsers list
        //   currentUsers.empty();
        //   for (var i = 0; i < users.length; i++) {
        //     currentUsers.append('<li>'+users[i]+'</li>');
        //   }
        // });
      }
    };
  }]);
