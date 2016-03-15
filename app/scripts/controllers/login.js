'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('LoginCtrl', function ($log, $window, $scope, $rootScope, AuthService, AUTH_EVENTS) {
    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.clearMsg = function () {
      $scope.errMsg = '';
    };

    var encryptCredentials = function () {
      $scope.credentials.password = $.md5('hotsports' + $scope.credentials.password + $scope.credentials.password.substr(0, 1)).substr(8, 16);
      return $scope.credentials;
    };

    $scope.userLogin = function () {
      var credentials = encryptCredentials();
      if (!isMobile(credentials.username)) {
        $scope.errMsg = '请输入正确的手机号码';
      } else {
        AuthService.login(credentials)
          .then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user.role);
            $scope.setCurrentUser(user);
          }, function (errMsg) {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed, errMsg);
            $scope.errMsg = errMsg;
            $scope.credentials.password = '';
          });
      }
    };

    function isMobile(str) {
      var reg = /^0?1[3|4|5|8|6|7][0-9]\d{8}$/;
      return reg.test(str);
    }
  });
