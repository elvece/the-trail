factories.factory('streamFactory', streamService );

streamService.$inject = ['$http'];

  function streamService ($http) {

    var service = {
      getStream: getStream,
      saveCommentFromSite: saveCommentFromSite,
      saveCommentFromPhone: saveCommentFromPhone,
      startSession: startSession
    };
    return service;

      function getStream(streamId){
        return $http({
          method: 'GET',
          url: '/geo-share/stream/' + streamId
        });
      }

      function saveCommentFromPhone(username, phone, message, location, hikeId){
        return $http({
          method: 'POST',
          url: '/geo-share/user/phone/comment',
          data: {
                  username: username,
                  phone: phone,
                  message: message,
                  hikeId: hikeId,
                  location: location
                }
        });
      }

      function saveCommentFromSite(username, phone, message, location, hikeId){
        return $http({
          method: 'POST',
          url: '/geo-share/user/comment',
          data: {
                  username: username,
                  phone: phone,
                  message: message,
                  hikeId: hikeId,
                  location: location
                }
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

