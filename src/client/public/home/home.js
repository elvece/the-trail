angular.module('directives')
  .directive('homeTemplate', [function(){
    return {
      restrict: 'A',
      templateUrl: 'home/home.html',
      controller: function(){
      var mtn = new Vivus('mtn', {
        type: 'scenario-sync',
        // file: './mtn.svg',
        duration: 20,
        start: 'autostart',
        dashGap: 20,
        forceRender: false
      });
      console.log(mtn);
      }
    };
  }]);


