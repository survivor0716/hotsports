'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.RouteAuthResolve
 * @description
 * # RouteAuthResolve
 * Provider in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .provider('RouteAuthResolve', function () {
    this.auth = function (authorizedRoles) {
      return ['$log', '$q', 'USER_ROLES', 'AuthService', function ($log, $q, USER_ROLES, AuthService) {
        if (!AuthService.isAuthorized(authorizedRoles)) {
          if (AuthService.isAuthenticated()) {
            // user is not allowed
            return $q.reject({authorized: false});
          } else {
            // user is not logged in
            return $q.reject({authenticated: false});
          }
        } else {
          return $q.when(AuthService.isAuthorized(authorizedRoles));
        }
      }];
    };
    this.$get = function () {
      //return {};
    };
  });
