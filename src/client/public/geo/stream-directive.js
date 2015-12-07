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
        var user;
        var userID = 0;

        ////// *** HELPER FUNCTIONS *** //////

        function displayStream(){
          streamBoard.empty();
          streamFactory.getStream(streamID)
            .then(function(data){
              console.log(data.data);
              socket.connect();
              var comments = data.data.comments;
              var message = comments.message;
              var location = comments.location;
              var user = comments.user;
              var room = data.data.room;
              socket.emit('init', room);
              userInZone();
              for (var i = 0; i < 30; i++) {
                if (comments[i]) {
                  streamBoard.append('<li>'+comments[i].user+ ': '+comments[i].message+'</li>');
                }
              }
            });
        }
        displayStream();

        function userInZone(){
          //here, user will be data get back from twilio
          if (user = 'undefined'){
            makeUserName();
          }
        // console.log(user);
          socket.emit('entered', user);
        }

        function makeUserName(){
          // var createdNames = [];
          userID ++;
          user = 'trailblazer'+userID;
          // createdNames.push(user);
        }

        ////// *** SOCKET REQUESTS *** //////

       //make comment to hike stream
        $scope.makeComment = function(){
          var newComment = $scope.commentInput;
          socket.emit('comment-sent', newComment);
          streamFactory.saveComment(user, newComment, streamID);
          $scope.commentInput = "";
        };

        //append comment after hitting socket
        socket.on('comment-received', function(message){
          console.log(message);
          streamBoard.append('<li>' +message.user+ ': '+message.message+'</li>');
        });

        socket.on('current-users', function(users){
          //populate currentUsers list
          console.log(users)
          currentUsers.empty();
          for (var i = 0; i < users.length; i++) {
            currentUsers.append('<li>'+users[i]+'</li>');
          }
        });

      }//end controller
    };
  }]);
