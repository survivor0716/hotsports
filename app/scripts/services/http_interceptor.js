'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.httpInterceptor
 * @description
 * # httpInterceptor
 * Factory in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .factory('httpInterceptor', ['$log', '$rootScope', '$q', 'AUTH_EVENTS', function ($log, $rootScope, $q, AUTH_EVENTS) {
    return {
      'responseError': function (response) {
        //$log.debug('responseError: ', response);
        return $q.reject(response);
      },
      'response'     : function (response) {
        if (response.data.errCode === 2001) {
          return $q.reject(response);
        }
        return response;
      },
      'request'      : function (config) {
        //$log.debug('request: ', config);
        return config;
      },
      'requestError' : function (config) {
        //$log.debug('requestError: ', config);
        return $q.reject(config);
      }
    };
  }]);
