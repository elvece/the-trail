angular.module('directives')
  .directive('hikeTemplate',['hikeFactory',function(hikeFactory){
    return {
      restrict: 'A',
      templateUrl: 'hikes/hike.html',
      controller: function(hikeFactory){
        var hike = hikeFactory.getHike()
          .then(function(data){
            console.log(data);
          });
      }
    };
  }]);
