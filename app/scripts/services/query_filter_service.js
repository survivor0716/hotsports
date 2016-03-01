'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.QueryFilterService
 * @description
 * # QueryFilterService
 * Service in the hotsportsApp.
 */
angular.module('hotsportsApp')
    .service('QueryFilterService', function ($log) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        this.currentCtrlTag = null;

        var queryParams = {};

        this.setQueryFilter = function (param, tag) {
            if(tag != this.currentCtrlTag) {
                this.resetQueryFilter();
                this.currentCtrlTag = tag;
            }
            if (typeof param === 'object') {
                for (var i in param) {
                    queryParams[i] = param[i];
                }
                $log.debug('Set query filter: ', queryParams);
            }
        };

        this.getQueryFilter = function () {
            return queryParams;
        };

        this.resetQueryFilter = function () {
            queryParams = {};
        };
    });
