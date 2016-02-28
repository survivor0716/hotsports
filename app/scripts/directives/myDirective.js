angular.module('hotsportsApp')
  .controller('TestScopeController', function ($scope) {
    $scope.say = function () {
      alert('hello');
    };
    $scope.name = 'leifeng';
  })
  .directive('helloWorld', function () {
    return {
      scope   : {
        saysomething: '&saysomething999',
        name        : '@'
      },
      restrict: 'AE',
      replace : true,
      template: '<button type="button" ng-bind="name" ng-init="saysomething();"></button>'
    }
  });
