'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.SuperManagerService
 * @description
 * # SuperManagerService
 * Service in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .service('SuperManagerService', function ($log, $http, $q, ServiceConfig, PromiseCallback, AuthService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.gymList = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.sm_gym_list, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.gymOverview = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.sm_gym_overview, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.gymOrder = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.sm_gym_order, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.gymCheckCashier = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.sm_gym_checkCashier, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.gymAddCashier = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.sm_gym_addCashier, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.gymSetCashierReceiveMsg = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.sm_gym_setCashierReceiveMsg, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.gymBindCashier = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.sm_gym_bindCashier, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.gymRemoveCashier = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.sm_gym_removeCashier, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.smsCode = function (phone) {
      return AuthService.smsCode(phone);
    };

    this.gymWithdraw = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.sm_gym_withdraw, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.gymWithdrawList = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.sm_gym_withdrawList, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };
  });
