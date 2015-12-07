//not working? why? can you not use a directive and also have a route attached to a view template?

// angular.module('directives')
//   .directive('geoHikeTemplate', ['$routeParams','hikeFactory', function(hikeFactory){
//     return {
//       restrict: 'E',
//       templateUrl: 'geo/hike/geo-hike.html',
//       controller: function($routeParams,hikeFactory){
//         console.log('hi');
//         $scope.hikeId = $routeParams.hikeId;
//         console.log($scope.hikeId);
//         $scope.hikeName = $routeParams.hikeName;
//         console.log($scope.hikeName);
//         hikeFactory.getHike($routeParams.hikeId).then(function(data){
//           console.log(data);
//         });
//       }
//     };
//   }]);

