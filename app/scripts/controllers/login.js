'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('LoginCtrl', function ($log, $window, $scope, $rootScope, $http, AuthService, AUTH_EVENTS) {
    //自适应屏幕
    //(function (doc, win) {
    //  var docEl = doc.documentElement,
    //      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    //      recalc = function () {
    //        var clientWidth = docEl.clientWidth;
    //        if (!clientWidth) return;
    //        docEl.style.fontSize = 20 * (clientWidth / 640) + 'px';
    //      };
    //
    //  if (!doc.addEventListener) return;
    //  win.addEventListener(resizeEvt, recalc, false);
    //  doc.addEventListener('DOMContentLoaded', recalc, false);
    //})($window.document, $window);


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
