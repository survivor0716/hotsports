angular.module('hotsportsApp')
  .controller('TestScopeController', function ($scope) {

  })
  .directive('helloWorld',function(){
    return {
      scope:{color:'='},
      restrict: 'AE',
      replace: true,
      template: '<div style="background-color:{{color}}">Hello World<div><input type="text" ng-model="color"></div></div>'
    }
  });
