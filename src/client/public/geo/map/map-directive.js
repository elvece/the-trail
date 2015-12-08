angular.module('directives')
  .directive('mapDisplay', ['mapFactory','streamFactory', '$window',function(mapFactory, streamFactory, $window){
    return {
      restrict: 'E',
      templateUrl: 'geo/map/map.html',
      controller: function($scope, mapFactory, streamFactory, $window){

            // User Infomation
            var currentUserInfo = null;
            var users = {};

            // Google Maps UI
            var map = null;
            var infowindow = null;
            var refreshTimeout = null;

            function userLocationUpdate(userInfo){
              if(!users[userInfo.id]) users[userInfo.id] = { id: userInfo.id };

              users[userInfo.id].name = userInfo.name;
              users[userInfo.id].latitude  = userInfo.latitude;
              users[userInfo.id].longitude = userInfo.longitude;
              users[userInfo.id].timestamp = new Date().getTime()
              refreshMarkers();
            }

            function refreshMarkers(){
              if (!map) return;
              if (!currentUserInfo.movedMapCenter && currentUserInfo.timestamp) {
                // $('#user-name').val(currentUserInfo.name);
                // $('#user-name').bind('keyup', function() {
                //     currentUserInfo.name = $('#user-name').val();
                // });
                currentUserInfo.movedMapCenter = true;
                map.setCenter(new google.maps.LatLng(
                  currentUserInfo.latitude, currentUserInfo.longitude));
              }

                for (var id in users) {
                  var userInfo = users[id];

                  if(userInfo.marker){
                    // If we haven't received any update from the user, marker of missing user is removed
                    if(userInfo.id != currentUserInfo.id && userInfo.timestamp + 1000*30 < new Date().getTime()){
                          userInfo.marker.setMap(null);
                          delete users[id];
                          continue;
                      }
                  } else{
                      // Create a marker for the new user
                      var marker = new google.maps.Marker({ map:map });
                      google.maps.event.addListener(marker, 'click', function() {
                        infowindow.setContent(marker.getTitle());
                        infowindow.open(map, marker);
                      })

                      userInfo.marker = marker;
                  }

                  //Move the markers
                  userInfo.marker.setTitle(userInfo.name);
                  userInfo.marker.setPosition(new google.maps.LatLng(userInfo.latitude, userInfo.longitude));
                }

                // Refresh the markers every 20 seconds
                clearTimeout(refreshTimeout);
                refreshTimeout = setTimeout(refreshMarkers, 1000*20);
            }

            function mapInitialize() {
              map = new google.maps.Map(angular.element(document.querySelector('#map-canvas')), {
                zoom: 5,
                center: new google.maps.LatLng(35.713819, 139.7598354)
              });
              infowindow = new google.maps.InfoWindow({ content: 'Test' });
              google.maps.event.addListener(map, 'click', function() {
                infowindow.close(map);
              });
              refreshMarkers();
            }

            function move_to_otheruser(){
              var ids = Object.keys(users);
              ids.slice(ids.indexOf(currentUserInfo.id),1);

              var random_user_id = ids[Math.floor(ids.length * Math.random())];
              var userInfo = users[random_user_id];
              map.setCenter(new google.maps.LatLng(userInfo.latitude, userInfo.longitude));

              infowindow.setContent(userInfo.name);
              infowindow.open(map, userInfo.marker);
            }

            google.maps.event.addDomListener(window, 'load', mapInitialize);
            currentUserInfo = mapFactory.initLocationSharing(userLocationUpdate);


      }//end controller
    };
  }]);
