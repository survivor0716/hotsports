'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:GymCtrl
 * @description
 * # GymCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('GymCtrl', function ($scope, $window) {
    $scope.reset = function () {
      $scope.gymInfo = {
        name: null,
        tel: null,
        person: null,
        addr: null
      };

      $scope.personInfo = {
        phone: null,
        wechatId: null,
        email: null
      };
    };

    $scope.submit = function () {
      var gymInfo = '', personInfo = '';
      for(var i in this.gymInfo) {
        gymInfo += i + ": " + this.gymInfo[i] + "\n";
      }
      for(var j in this.personInfo) {
        personInfo += j + ": " + this.personInfo[j] + "\n";
      }

      $window.alert('提交信息: \n\n' + gymInfo + '\n' + personInfo);

      $scope.reset();
    };
  });
