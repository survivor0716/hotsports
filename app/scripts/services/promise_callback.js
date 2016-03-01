'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.PromiseCallback
 * @description
 * # PromiseCallback
 * Factory in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .factory('PromiseCallback', function ($log, $q, $rootScope, AUTH_EVENTS) {
    return {
      successCallback: function (response) {
        $log.debug('successCallback', arguments);
        if (typeof response.data === 'object') {
          var data = response.data;
          //if (data.result) {
          //  return $q.resolve(data.data);
          //} else {
          //  return $q.reject(data.errMsg);
          //}
          return data.result ? $q.resolve(data.data) : $q.reject(data.errMsg);
        } else {
          return $q.reject(response.data);
        }
      },
      failureCallback: function (response) {
        $log.debug('failureCallback', arguments);
        return $q.reject(response.data);
      }
    };
  });
