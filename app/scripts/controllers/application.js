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

    if ($window.localStorage.userInfo) {
      $scope.currentUser = JSON.parse($window.localStorage.userInfo);
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
    var withdrawPromise, coachPromise;
    $scope.refreshBadges = function () {
      (function () {
        withdrawPromise = HotSportsManagerService.withdraw({amountOnly: true});
        coachPromise = HotSportsManagerService.coach({amountOnly: true});
        $log.debug(coachPromise);
        return $q.all([withdrawPromise, coachPromise])
      })()
        .then(function (data) {
          $log.debug('Refresh Badges: ', data);
          $scope.withdrawBadges = data[0].amount;
          $scope.coachBadges = data[1].amount;
        }, function (errMsg) {
          $log.debug('刷新Badges失败');
        });
      //HotSportsManagerService.withdraw({amountOnly: true})
      //  .then(function (data) {
      //    $log.debug('Withdraw Badges:', data);
      //    $scope.withdrawBadges = data.amount;
      //  }, function (errMsg) {
      //    $log.debug('刷新 Withdraw Badges 失败');
      //  });
      //
      //HotSportsManagerService.coach({amountOnly: true})
      //  .then(function (data) {
      //    $log.debug('Coach Badges:', data);
      //    $scope.coachBadges = data.amount;
      //  }, function (errMsg) {
      //    $log.debug('刷新 Coach Badges 失败');
      //  });
    };

    $scope.setCurrentPath = function (path) {
      $scope.currentPath = path;
    };

    $scope.abortRequest = function () {
      coachPromise.abort();
    };
  });
