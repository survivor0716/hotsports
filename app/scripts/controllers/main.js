'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.setCurrentPath('#/main');
  });
