'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.USER_ROLES
 * @description
 * # USER_ROLES
 * Constant in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .constant('USER_ROLES', {
    all             : '*',
    hotsportsManager: 'hotsportsManager',
    superManager    : 'superManager',
    cashier         : 'cashier'
  });
