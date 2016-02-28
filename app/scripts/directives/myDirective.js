angular.module('hotsportsApp')
  .controller('TestScopeController', function ($scope) {
    $scope.name = 'leifeng';
  })
  .directive('myDirective', function () {
    return {
      restrict: 'EA',
      scope: true,//改变此处的取值,看看有什么不同
      template: '<div>儿子:{{ name }}<input ng-model="name"/></div>'
    };
  });
