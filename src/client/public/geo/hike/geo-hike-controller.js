var app = angular.module('myApp');

app.controller('geoHikeController', ['$scope', '$routeParams', 'hikeFactory', function($scope, $routeParams, hikeFactory){

    var socket = io.connect('http://localhost:3000');
    $scope.hikeId = $routeParams.hikeId;
    $scope.hikeName = $routeParams.hikeName;

    hikeFactory.getHike($scope.hikeId)
      .then(function(data){
        $scope.coordinates = {
            latitude: data.data.map[0],
            longitude: data.data.map[1]
        };
        $scope.hikeComments = data.data.stream[0].comments;
        $scope.stream = data.data.stream[0]._id;
        // console.log(data);
        $scope.room = data.data.stream[0].room;
        socket.emit('init', $scope.room);
      });
}]);

