'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:ResourceCtrl
 * @description
 * # ResourceCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('ResourceCtrl', function ($scope) {
    $scope.setCurrentPath('#/resource');
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
