angular.module('directives')
  .directive('hikeTemplate',['hikeFactory',function(hikeFactory){
    return {
      restrict: 'A',
      templateUrl: 'hikes/hike.html',
      controller: function(hikeFactory){
        console.log($scope.hikeId);
        hikeFactory.getHike($scope.hikeId)
          .then(function(data){
            console.log(data);
          });
      }
    };
  }]);
