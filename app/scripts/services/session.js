'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.Session
 * @description
 * # Session
 * Service in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .service('Session', function ($log, $window) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    /**
     * @description 创建用户信息Session
     * @param {Object} userInfo = {uid:{string}, role:{string|array}}
     */
    this.create = function (userInfo) {
      //this.id = sessionId;
      this.userId = userInfo.uid;
      this.userNickName = userInfo.nickName;
      this.userRole = userInfo.role;
      $window.sessionStorage.userInfo = JSON.stringify(userInfo);
      $log.debug('用户Session已创建');
    };

    /**
     * @description 注销用户信息Session
     */
    this.destroy = function () {
      //this.id = null;
      this.userId = null;
      this.userNickName = null;
      this.userRole = null;
      $window.sessionStorage.removeItem("userInfo");
      $log.debug('用户Session已清除');
    };

    var self = this;
    /**
     * @description 初始化用户信息，判断是否已有Session
     */
    this.init = function () {
      if ($window.sessionStorage.userInfo) {
        var userInfo = JSON.parse($window.sessionStorage.userInfo);
        $log.debug('sessionStorage 已有信息: ', userInfo);
        self.userId = userInfo.uid;
        self.userNickName = userInfo.nickName;
        self.userRole = userInfo.role;
      } else {
        $log.debug('sessionStorage 没有用户登录信息');
      }
    };

    this.init();
  });
