factories.factory('streamFactory', streamService );

streamService.$inject = ['$http'];

  function streamService ($http) {

    var service = {
      getStream: getStream,
      saveComment: saveComment,
      saveStream: saveStream,
      startText: startText
    };
    return service;

      function getStream(streamID){
        return $http({
          method: 'GET',
          url: '/geo-share/stream/' + streamID
        });
      }

      function saveComment(user, message, streamID){
        return $http({
          method: 'POST',
          url: '/geo-share/stream/comment',
          data: {
                  user: user,
                  message: message,
                  streamID: streamID,
                  // location: location
                }
        });
      }

      function saveStream(users, room, hikeID){
        return $http({
          method: 'POST',
          url: '/geo-share/stream',
          data: {
                  users: users,
                  room: room,
                  id: hikeID
                }
        });
      }

      function startText(phone, username, message){
        return $http({
          method: 'POST',
          url: '/geo-share/start/session',
          data: {
                  phone: phone,
                  username: username,
                  message: message
                }
        });
      }

      function saveUserComment(phone, username, message, location, streamID){
        return $http({
          method: 'POST',
          url: '/geo-share/user/comment',
          data: {
                  phone: phone,
                  username: username,
                  message: message,
                  location: location,
                  streamID: streamID
                }
        });
      }
  }

