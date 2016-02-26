'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('ApplicationCtrl', function ($q, $log, $window, $scope, $http, $location, $route, USER_ROLES, AuthService, HotSportsManagerService) {
    function asyncGreet(name) {
      // perform some asynchronous operation, resolve or reject the promise when appropriate.
      return $q(function(resolve, reject) {
        // This is only an example to create asynchronism
        name += ' (rejected)';
        setTimeout(function() {
          if (0) {
            resolve('Hello, ' + name + '!');
          } else {
            reject('Greeting ' + name + ' is not allowed.');
          }
        }, 1000);
      });
    }

    var promise = asyncGreet('Robin Hood');
    promise.then(function(greeting) {
      alert('Success: ' + greeting);
    }, function(reason) {
      alert('Failed: ' + reason);
    });
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthenticated = AuthService.isAuthenticated;
    $scope.isAuthorized = AuthService.isAuthorized;
    $scope.logout = function () {
      AuthService.logout()
        .then(function () {

        }, function () {
          //$window.alert('网络异常');
        });
      $("#js-navbar-collapse").collapse('toggle');
      $scope.currentUser = null;
      $location.url('login');
    };

    if ($window.sessionStorage.userInfo) {
      $scope.currentUser = JSON.parse($window.sessionStorage.userInfo);
    }

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    };

    $scope.panelStyle = 'panel-primary';
    $scope.changeStyle = function (style) {
      $scope.panelStyle = style;
    };

    $scope.withdrawBadges = 0;
    $scope.coachBadges = 0;
    $scope.refreshBadges = function () {
      HotSportsManagerService.withdraw({amountOnly: true})
        .then(function (data) {
          $log.debug('Withdraw Badges:', data);
          $scope.withdrawBadges = data.amount;
        }, function (errMsg) {
          $log.debug('刷新 Withdraw Badges 失败');
        });

      HotSportsManagerService.coach({amountOnly: true})
        .then(function (data) {
          $log.debug('Coach Badges:', data);
          $scope.coachBadges = data.amount;
        }, function (errMsg) {
          $log.debug('刷新 Coach Badges 失败');
        });
    };

    $scope.setCurrentPath = function (path) {
      $scope.currentPath = path;
    };
  });
