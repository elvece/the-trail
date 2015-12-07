factories.factory('hikeFactory', hikeService );

hikeService.$inject = ['$http'];

  function hikeService ($http) {

    var service = {
      getHike: getHike,
      getAllHikes: getAllHikes
    };
    return service;

      function getHike(hikeID){
        return $http({
          method: 'GET',
          url: '/hikes/hike/' + hikeID
        });
      }

      function getAllHikes(){
        return $http({
          method: 'GET',
          url: '/hikes/all',
        });
      }
  }
