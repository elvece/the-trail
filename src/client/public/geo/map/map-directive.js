angular.module('directives')
  .directive('mapDisplay', ['$geolocation','mapFactory','streamFactory', function(geolocation, mapFactory, streamFactory, $geolocation){
    return {
      restrict: 'E',
      templateUrl: 'geo/map/map.html',
      controller: function($geolocation, $scope,mapFactory, streamFactory){

        $geolocation.getCurrentPosition({
            timeout: 60000
         }).then(function(position) {
            $scope.myPosition = position;
            $scope.map = {
              center: {
                latitude: $scope.myPosition.coords.latitude,
                longitude: $scope.myPosition.coords.longitude
              },
              zoom: 17
            };
         });

         //do i really need this
        $geolocation.watchPosition({
          timeout: 60000,
          maximumAge: 250,//can make longer
          enableHighAccuracy: true
        });
        // this is regularly updated
        $scope.myCoords = $geolocation.position.coords;
        // this becomes truthy, and has 'code' and 'message'
        $scope.myError = $geolocation.position.error;


      }//end controller
    };
  }]);
