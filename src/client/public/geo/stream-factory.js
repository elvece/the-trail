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

      function saveComment(phone, username, message, location, streamID){
        return $http({
          method: 'POST',
          url: '/geo-share/stream/comment',
          data: {
                  username: username,
                  phone: phone,
                  message: message,
                  streamID: streamID,
                  location: location
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

      function startText(phone, message){
        return $http({
          method: 'POST',
          url: '/geo-share/start/session',
          data: {
                  phone: phone,
                  message: message
                }
        });
      }

  }

