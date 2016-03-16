'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.AuthService
 * @description
 * # AuthService
 * Service in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .factory('AuthService', function ($log, $window, $http, $q, ServiceConfig, PromiseCallback, Session, USER_ROLES) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    /**
     * @description 登录认证对象
     * @type {Object}
     */
    var authService = {};

    /**
     *
     * @description 后台登录
     * @param {Object} credentials 用户名及密码
     * @return {Promise}
     */
    authService.login = function (credentials) {
      return $http.post(ServiceConfig.login, credentials, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback)
        .then(function (data) {
          $log.debug('登录接口回调数据: ', data);
          Session.create(data);
          return $q.resolve(data);
        }, function (errMsg) {
          return $q.reject(errMsg);
        });
    };

    /**
     * @description 根据Session服务中是否存在userId的值，判断是否已登录
     * @returns {boolean}
     */
    authService.isAuthenticated = function () {
      if ($window.localStorage.userInfo)
        return !!Session.userId;
      return false;
    };

    //
    /**
     * @description 判断用户是否有指定的权限
     * @param {Array|String} authorizedRoles 指定需要用户拥有的权限
     * @returns {Boolean|boolean}
     */
    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }

      return (authService.isAuthenticated() && (authorizedRoles.indexOf(USER_ROLES.all) !== -1 || authorizedRoles.indexOf(Session.userRole) !== -1));
    };

    /**
     * @description 后台登出
     */
    authService.logout = function () {
      Session.destroy();
      return $http.post(ServiceConfig.logout, {}, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback)
        .then(function (data) {
          $log.debug('登出接口回调数据: ', data);
          return $q.resolve(data);
        }, function (errMsg) {
          return $q.reject(errMsg);
        });
    };

    /**
     * @description 发送短信验证码，参数phone为手机号码
     * @param phone
     * @returns {Promise}
     */
    authService.smsCode = function (phone) {
      return $http.post(ServiceConfig.smsCode, {phone: phone})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    /**
     * @description 修改密码
     * @param params
     * @returns {Promise}
     */
    authService.changePassword = function (params) {
      params = params || {};
      return $http.post(ServiceConfig.change_password, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    return authService;
  });
