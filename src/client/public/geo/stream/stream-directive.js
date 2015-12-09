angular.module('directives')
  .directive('geoStream', ['$geolocation','streamFactory', function($geolocation, streamFactory){
    return {
      restrict: 'E',
      templateUrl: 'geo/stream/stream.html',
      controller: function($geolocation, $scope, streamFactory){

        ///// *** GLOBALS *** /////

        //for local: 'http://localhost:3000', remove for heroku
        var socket = io.connect('http://localhost:3000');
        //to populate view
        var streamBoard = angular.element(document.querySelector('#stream-board'));
        var userID = 0;
        //array of current user names so no duplicates
        var currentUserNames = [];
        //array of people who have entered their numbers for access
        var currentUsersInfo = [];


        ///// *** GEOLOCATION *** /////

        $scope.options = {scrollwheel: false};

        $geolocation.getCurrentPosition({
            timeout: 60000
         }).then(function(position) {
            $scope.userPosition = position;
            $scope.map = {
              center: {
                latitude: $scope.coordinates.latitude,//location of current hike
                longitude: $scope.coordinates.longitude
              },
              zoom: 10,
              markers: [],
              events: {}
            };
            $scope.marker = {
              id: Date.now(),
              coords: {
                latitude: 39.0708,///location of current user location
                longitude: -106.989
              },
              showWindow: false,
              options: {
                animation: 2,
                title: 'Home',
                labelContent: $scope.hikeName,
                labelClass: "marker-labels"
              }
            };

          $scope.map.markers.push($scope.marker);
          console.log($scope.map.markers)
         //  $scope.map.markersEvents = {
         //    mouseover: function (marker, eventName, model, args) {
         //      model.options.labelContent = "Position - lat: " + model.latitude + " lon: " + model.longitude;
         //      model.showWindow = true;
         //      $scope.$apply();
         //    },
         //    mouseout: function (marker, eventName, model, args) {
         //      model.options.labelContent = " ";
         //      model.showWindow = false;
         //      $scope.$apply();
         //    }
         //  };



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

          ////// *** SOCKET REQUESTS *** //////

          //comments on web will only be to other users; web users can only like comments, but not post because not in location. have to target @user to send them a question

         //make comment to hike stream
          $scope.makeComment = function(){
            var newComment = $scope.commentInput;
            console.log(currentUsersInfo)
            var user = currentUsersInfo[0];
            console.log(user)
            var userLocation = [
                $scope.userPosition.coords.latitude,
                $scope.userPosition.coords.longitude
              ];
            streamFactory.saveCommentFromSite(user.username, user.phone, newComment, userLocation, user.hikeId)
              .then(function(data){
                console.log(data);
                socket.emit('comment-sent', newComment);
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
