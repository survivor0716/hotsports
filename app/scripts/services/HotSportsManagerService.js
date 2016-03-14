'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.HotSportsManagerService
 * @description
 * # HotSportsManagerService
 * Service in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .service('HotSportsManagerService', function ($log, $http, $q, ServiceConfig, PromiseCallback) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.sportType = function () {
      return $http.post(ServiceConfig.sport_type, {}, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.addGym = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.hs_gym_post, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.editGym = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.hs_gym_put, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.withdraw = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.hs_todo_withdraw, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.handleWithdraw = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.hs_todo_handleWithdraw, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.coach = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.hs_todo_coach, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.setWithdraw = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.hs_gym_withdraw_setting_put, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.checkUser = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.hs_gym_checkUser, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.addSuperManager = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.hs_gym_addSuperManager, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.bindSuperManager = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.hs_gym_bindSuperManager, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.gymDetail = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.hs_gym_detail, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };
  });
