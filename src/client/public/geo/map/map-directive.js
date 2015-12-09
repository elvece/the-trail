angular.module('directives')
  .directive('mapDisplay', ['$geolocation','mapFactory','streamFactory', function(geolocation, mapFactory, streamFactory, $geolocation){
    return {
      restrict: 'E',
      templateUrl: 'geo/map/map.html',
      controller: function($geolocation, $scope,mapFactory, streamFactory){
        $scope.options = {scrollwheel: false};

        $geolocation.getCurrentPosition({
            timeout: 60000
         }).then(function(position) {
            $scope.myPosition = position;
            $scope.map = {
              center: {
                latitude: $scope.myPosition.coords.latitude,
                longitude: $scope.myPosition.coords.longitude
              },
              zoom: 17,
              markers: [],
              events: {}
            };
            $scope.marker = {
              id: Date.now(),
              coords: {
                latitude: 39.734528,
                longitude: -104.975450
              },
              showWindow: false,
              options: {
                animation: 2,
                title: 'Home',
                labelContent: 'test',
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
