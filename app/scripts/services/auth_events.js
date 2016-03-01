'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.AUTH_EVENTS
 * @description
 * # AUTH_EVENTS
 * Constant in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .constant('AUTH_EVENTS', {
    loginSuccess    : 'auth-login-success',
    loginFailed     : 'auth-login-failed',
    logoutSuccess   : 'auth-logout-success',
    sessionTimeout  : 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized   : 'auth-not-authorized'
  });
