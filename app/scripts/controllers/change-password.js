'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:ChangePasswordCtrl
 * @description
 * # ChangePasswordCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('ChangePasswordCtrl', function ($log, $window, $scope, AuthService) {
    $scope.oldPw = $scope.newPw = $scope.confirmNewPw = null;
    $scope.changePassword = function () {
      var params = {
        oldPass: $.md5('hotsports' + $scope.oldPw + $scope.oldPw.substr(0, 1)).substr(8, 16),
        newPass: $.md5('hotsports' + $scope.newPw + $scope.newPw.substr(0, 1)).substr(8, 16)
      };
      $log.debug('修改密码参数:', params);
      AuthService.changePassword(params)
        .then(function (data) {
          $log.debug(data);
          $window.alert(data);
          $(".change-password-modal").modal('hide');
        }, function (errMsg) {
          $log.debug(errMsg);
          $window.alert(errMsg);
        });
      $scope.oldPw = $scope.newPw = $scope.confirmNewPw = null;
    };
  });
