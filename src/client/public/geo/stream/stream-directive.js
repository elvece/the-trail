angular.module('directives')
  .directive('geoStream', ['$geolocation','streamFactory', 'NgMap', function($geolocation, streamFactory, NgMap){
    return {
      restrict: 'E',
      templateUrl: 'geo/stream/stream.html',
      controller: function($geolocation, $scope, streamFactory, NgMap){

        ///// *** GLOBALS *** /////

        //for local: 'http://localhost:3000', remove for heroku
        var socket = io.connect('http://localhost:3000');
        //to populate view
        var streamBoard = angular.element(document.querySelector('#stream-board'));
        var mapDiv = angular.element(document.querySelector('#map'));
        var userID = 0;
        var commentId = 0;
        var windowId = 0;
        //array of current user names so no duplicates
        var currentUserNames = [];
        //array of people who have entered their numbers for access
        var currentUsersInfo = [];
        //map marker locations
        $scope.mapMarkers = [];


        ///// *** GOOGLE MAP *** /////

          NgMap.getMap().then(function(map) {
            $scope.map = map;
            // console.log('markers', map.markers);
          });


        ///// *** GEOLOCATION *** /////

        $geolocation.getCurrentPosition({
            timeout: 60000
         }).then(function(position) {
            $scope.userPosition = position;


          ///// *** START USER SESSION *** /////

          //start session by sending text to user
          $scope.startSession = function(){
            var newUser = new User($scope.userNameInput, $scope.phoneNumberInput);
            console.log(newUser)
            currentUsersInfo.push(newUser);

            var message_init = 'Thanks '+newUser.username+' for joining The Trail at '+$scope.hikeName+'! You can now start commenting on the live stream board using the site.';
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

          //generates comment data with unique id's for map marker population
          function makeCommentData(){
            commentId++;
            windowId++;
            var newComment = {
              id: commentId,
              windowId: 'w'+windowId,
              message: $scope.commentInput,
              user: currentUsersInfo[0],
              location: [
                $scope.userPosition.coords.latitude,
                $scope.userPosition.coords.longitude
              ]
            };
            return newComment;
          }

          ////// *** SOCKET REQUESTS *** //////

          //comments on web will only be to other users; web users can only like comments, but not post because not in location. have to target @user to send them a question

         //make comment to hike stream
          $scope.makeComment = function(){
            var newComment = makeCommentData();
            $scope.mapMarkers.push(newComment);
            console.log($scope.mapMarkers)
            $scope.commentId = newComment.id;
            $scope.commentLocation = {
              latitude: location[0],
              longitude: newComment.location[1]
            };
            $scope.windowId = newComment.windowId;
            $scope.commentUsername = newComment.user.username;
            $scope.commentMessage = newComment.message;

            streamFactory.saveCommentFromSite(newComment.user.username, newComment.user.phone, newComment.message, newComment.location, newComment.user.hikeId)
              .then(function(data){
                console.log(data);
                socket.emit('comment-sent', newComment.message, newComment.location);
                //generate marker event
              });
            $scope.commentInput = "";
          };

          //append comment after hitting socket
          socket.on('comment-received', function(message){
            console.log(message);
            streamBoard.append('<li>' +message.user+ ': '+message.message+'</li>');
          });

        });
      }//end controller
    };
  }]);
