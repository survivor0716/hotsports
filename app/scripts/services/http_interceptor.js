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
      'response'     : function (response) {
        //$log.debug('response: ', response);
        return response;
      },
      'responseError': function (response) {
        //$log.debug('responseError: ', response);
        //if (response.status === 403) {
        //  if (response.data.errCode === 2001) {
        //    $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);
        //    return $q.reject(response);
        //  } else {
        //    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        //    return $q.reject(response);
        //  }
        //}
        return $q.reject(response);
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
