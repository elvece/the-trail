angular.module('directives')
  .directive('liveStream', ['streamFactory', function(streamFactory){
    return {
      restrict: 'E',
      templateUrl: 'geo/stream/stream.html',
      controller: function($scope, streamFactory){

        ///// *** GLOBALS *** /////

        //for local: 'http://localhost:3000', remove for heroku
        var socket = io.connect('http://localhost:3000');
        //to populate view
        var streamBoard = angular.element(document.querySelector('#stream-board'));
        var currentUsers = angular.element(document.querySelector('#current-users'));
        var userID = 0;
        var currentUserNames = [];
        //array of people who have entered their numbers for access
        var currentUsersInfo = [];


        ///// *** START USER SESSION *** /////

        //start session by sending text to user
        $scope.startSession = function(){
          var newUser = new User($scope.userNameInput, $scope.phoneNumberInput);
          console.log(newUser)
          currentUsersInfo.push(newUser);

          var message_init = 'Thanks '+newUser.username+' for joining The Trail. You can now start live streaming on site.';
          streamFactory.startSession(newUser.username, newUser.phone, message_init, newUser.hikeId)
            .then(function(data){
              console.log(data);
              socket.emit('entered', newUser.username);
            });
          $scope.phoneNumberInput = "";
          $scope.userNameInput = "";
        };

        ////// *** HELPER FUNCTIONS *** //////

        //user constructor
        function User(username, phone){
          // this.id = guid();
          this.username = username;
          this.phone = '+1'+phone;
          this.hikeId = $scope.hikeId;
        }


        // function displayStream(){
        //   streamBoard.empty();
        //   streamFactory.getStream(streamID)
        //     .then(function(data){
        //       console.log(data.data);
        //       socket.connect();
        //       var comments = data.data.comments;
        //       // var user = {
        //       //   phone: comments.user.phone,
        //       //   username: comments.user.username
        //       // };
        //       // var userTextName = '@'+user.username;
        //       var message = comments.message;
        //       var location = comments.location;
        //       var room = data.data.room;
        //       socket.emit('init', room);
        //       // checkUser(user);
        //       for (var i = 0; i < 30; i++) {
        //         if (comments[i]) {
        //           streamBoard.append('<li>'+comments[i].user.username+ ': '+comments[i].message+'</li>');
        //         }
        //       }
        //     });
        // }
        // displayStream();

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

       //make comment to hike stream
        $scope.makeComment = function(){
          var newComment = $scope.commentInput;
          console.log(currentUsersInfo)
          var user = currentUsersInfo[0];
          console.log(user)
          streamFactory.saveCommentFromSite(user.username, user.phone, newComment, $scope.userPosition, user.hikeId);
          socket.emit('comment-sent', newComment);
          $scope.commentInput = "";
        };

        //append comment after hitting socket
        socket.on('comment-received', function(message){
          console.log(message);
          streamBoard.append('<li>' +message.user.username+ ': '+message.message+'</li>');
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
