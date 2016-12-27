'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.loading
 * @description
 * # loading
 * Factory in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .factory('timestampMarker', ["$rootScope", function ($rootScope) {
    var timestampMarker = {
      request : function (config) {
        $rootScope.loading = true;
        config.requestTimestamp = new Date().getTime();
        return config;
      },
      response: function (response) {
        $rootScope.loading = false;
        response.config.responseTimestamp = new Date().getTime();
        return response;
      }
    };
    return timestampMarker;
  }]);
