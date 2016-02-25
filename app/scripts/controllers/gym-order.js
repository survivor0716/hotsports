'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:GymorderCtrl
 * @description
 * # GymorderCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('GymorderCtrl', function ($log, $window, $scope, GymService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    GymService.getGymOrder()
      .then(function (data) {
        $log.debug(data);
        $scope.order_data = data;
      }, function (errMsg) {
        $scope.errMsg = errMsg;
        $window.alert(errMsg);
      });
  });
