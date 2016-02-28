angular.module('hotsportsApp')
  .directive('hello', function() {
  return {
    restrict: 'E',
    template: '<div>Hi there <span ng-transclude></span></div>',
    replace: true,
    transclude: true
  };
});
