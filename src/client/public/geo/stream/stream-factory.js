factories.factory('streamFactory', streamService );

streamService.$inject = ['$http'];

  function streamService ($http) {

    var service = {
      getStream: getStream,
      saveComment: saveComment,
      startText: startText
    };
    return service;

      function getStream(streamId){
        return $http({
          method: 'GET',
          url: '/geo-share/stream/' + streamId
        });
      }

      function startSession(username, phone, message, hikeId){
        return $http({
          method: 'POST',
          url: '/geo-share/start/session',
          data: {
                  username: username,
                  phone: phone,
                  message: message,
                  hikeId: hikeId
                }
        });
      }

  }

