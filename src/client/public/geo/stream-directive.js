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
        var userID = 0;
        var currentUserNames = [];
        //array of people who have entered their numbers for access
        var currentUsersInfo = [];
        //user constructor
        function User(username, phone){
          this.username = username;
          this.phone = phone;
        }

        //start session by sending text to user
        $scope.startSession = function(){
          var newUser = new User($scope.userNameInput, $scope.phoneNumberInput);
          currentUsersInfo.push(newUser);
          console.log(newUser);
          console.log(currentUsersInfo);

          var message_init = 'Thanks '+newUser.username+' for joining The Trail. To start live streaming, please first share your location from your mobile device.';
          streamFactory.startText(newUser.phone, message_init)
            .then(function(data){
              console.log(data);
              socket.emit('entered', newUser.username);
            });

          // var message_join = ''+newUser.username+' has joined the stream.';
          // streamFactory.saveComment(newUser.username, newUser.phone, message_join, streamID)
          //   .then(function(data){
          //     console.log(data);
          //   });
          $scope.phoneNumberInput = "";
          $scope.userNameInput = "";
        };

        ////// *** HELPER FUNCTIONS *** //////

        function displayStream(){
          streamBoard.empty();
          streamFactory.getStream(streamID)
            .then(function(data){
              console.log(data.data);
              socket.connect();
              var comments = data.data.comments;
              // var user = {
              //   phone: comments.user.phone,
              //   username: comments.user.username
              // };
              // var userTextName = '@'+user.username;
              var message = comments.message;
              var location = comments.location;
              var room = data.data.room;
              socket.emit('init', room);
              // checkUser(user);
              for (var i = 0; i < 30; i++) {
                if (comments[i]) {
                  streamBoard.append('<li>'+comments[i].user.username+ ': '+comments[i].message+'</li>');
                }
              }
            });
        }
        displayStream();

        function checkUser(user){
          //here, user will be data get back from twilio
          if (user.username = 'undefined' || ""){
            user.username = makeUserName();
          } else {
            user.username = user.username;
          }
          if (currentUserNames.indexOf(user.username) === -1){
            currentUserNames.push(user.username);
          } else {
            $scope.errorMessage = 'That username is already in use. Please choose another one.';
          }
          console.log(user.username);
          socket.emit('entered', user.username);
        }

        function userInZone(){
          //checks if users in location parameters
        }

        function makeUserName(){
          userID ++;
          var generatedUserName = 'trailblazer'+userID;
          return generatedUserName;
        }

        ////// *** SOCKET REQUESTS *** //////

        //comments on web will only be to other users; web users can only like comments, but not post because not in location. have to target @user to send them a question

       //make comment to hike stream - really this will only be posts from users phones
        $scope.makeComment = function(){
          // var newComment = $scope.commentInput;
          // socket.emit('comment-sent', newComment);
          //this user needs to be username and phonenumber
          // streamFactory.saveComment(user, newComment, streamID);
          // $scope.commentInput = "";
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
