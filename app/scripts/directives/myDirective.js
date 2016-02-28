angular.module('hotsportsApp')
  .controller('TestScopeController', function ($scope) {

  })
  .directive('helloWorld',function(){
    return {
      scope: {color:'@colorAttr'},  //指明了隔离作用域中的属性color应该绑定到属性colorAttr
      restrict: 'AE',
      replace: true,
      template: '<p style="background-color:{{color}}">Hello World</p>'
    }
  });
