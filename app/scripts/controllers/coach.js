'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:CoachCtrl
 * @description
 * # CoachCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('CoachCtrl', function ($log, $scope, $window, auth) {
    $log.debug(auth);
    $scope.reset = function () {
      $scope.coachInfo = {
        name: null,
        phone: null,
        wechatId: null
      };
    };

    $scope.submit = function () {
      var coachInfo = '';
      for(var i in $scope.coachInfo) {
        coachInfo += i + ": " + $scope.coachInfo[i] + "\n";
      }

      $window.alert('提交信息: \n\n' + coachInfo);

      $scope.reset();
    };
  });
