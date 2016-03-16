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
      var deferredAbort = $q.defer();
      //var promise = $http.post(ServiceConfig.hs_todo_coach, params, {'withCredentials': true, timeout: deferredAbort})
      var request = $http({
        method: "post",
        url: ServiceConfig.hs_todo_coach,
        data: params,
        timeout: deferredAbort.promise,
        withCredentials: true
      });
      var promise = request.then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
      // Now that we have the promise that we're going to return to the
      // calling context, let's augment it with the abort method. Since
      // the $http service uses a deferred value for the timeout, then
      // all we have to do here is resolve the value and AngularJS will
      // abort the underlying AJAX request.
      promise.abort = function () {
        deferredAbort.resolve({data: {errMsg: 'Abort Request'}});
      };
      // Since we're creating functions and passing them out of scope,
      // we're creating object references that may be hard to garbage
      // collect. As such, we can perform some clean-up once we know
      // that the requests has finished.
      //promise.finally(
      //  function () {
      //    $log.debug("Cleaning up object references.");
      //    promise.abort = angular.noop;
      //    deferredAbort = request = promise = null;
      //  }
      //);
      return promise;
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
