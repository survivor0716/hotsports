'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.ServiceConfig
 * @description
 * # ServiceConfig
 * Constant in the hotsportsApp.
 */

/**
 * @description Hubo PHP后台接口域名地址 用于筛选高德地图场馆数据
 * @type {string}
 */
var SERVER_BASE_URL_PHP = 'http://app.hotsports.cn/index.php';
/**
 * @description Badcat PHP后台接口域名地址
 * @type {string}
 */
var SERVER_BASE_URL2_PHP = 'http://test.service.hotsports.cn/system/Api';
/**
 * @description JAVA后台接口域名地址
 * @type {string}
 */
var SERVER_BASE_URL_JAVA = 'http://test.appserver.hotsports.cn';

angular.module('hotsportsApp')
  .constant('ServiceConfig', {
    //短信验证码
    smsCode       : SERVER_BASE_URL_JAVA + '/verifycode/send',
    //coach_login:    SERVER_BASE_URL_JAVA + '/login/manager',
    manager_qrcode: SERVER_BASE_URL_JAVA + '/wechat/showqrcode',

    gym_lock     : SERVER_BASE_URL_PHP + '/App/Stadium/lock',
    gym_list_get : SERVER_BASE_URL_PHP + '/App/Stadium/query',
    gym_type1_get: SERVER_BASE_URL_PHP + '/App/Stadium/queryStadiumType1',
    gym_type2_get: SERVER_BASE_URL_PHP + '/App/Stadium/queryStadiumType2',
    gym_type3_get: SERVER_BASE_URL_PHP + '/App/Stadium/queryStadiumType3',

    login          : SERVER_BASE_URL2_PHP + '/Index/login',
    logout         : SERVER_BASE_URL2_PHP + '/Index/logout',
    sport_type     : SERVER_BASE_URL2_PHP + '/SportType',
    change_password: SERVER_BASE_URL2_PHP + '/Global/changePass',

    hs_gym_list            : SERVER_BASE_URL2_PHP + '/HGym',
    hs_gym_add             : SERVER_BASE_URL2_PHP + '/HGym/addGym',
    hs_gym_detail          : SERVER_BASE_URL2_PHP + '/HGym/gymDetail',
    hs_gym_setWithdraw     : SERVER_BASE_URL2_PHP + '/HGym/setWithdrawal',
    hs_gym_checkUser       : SERVER_BASE_URL2_PHP + '/HotSportsManager/checkUser',
    hs_gym_addSuperManager : SERVER_BASE_URL2_PHP + '/HotSportsManager/addSuperManager',
    hs_gym_bindSuperManager: SERVER_BASE_URL2_PHP + '/HotSportsManager/bindSuperManager',
    hs_gym_account_add     : SERVER_BASE_URL2_PHP + '/HotSportsManager/addBankAccount',
    hs_todo_withdraw       : SERVER_BASE_URL2_PHP + '/HTodo/withdrawalList',
    hs_todo_handleWithdraw : SERVER_BASE_URL2_PHP + '/HTodo/handleWithdrawal',
    hs_todo_coach          : SERVER_BASE_URL2_PHP + '/HTodo/coachList',

    sm_gym_list                : SERVER_BASE_URL2_PHP + '/SGym',
    sm_gym_overview            : SERVER_BASE_URL2_PHP + '/SGym/gymDetail',
    sm_gym_order               : SERVER_BASE_URL2_PHP + '/Order',
    sm_gym_checkCashier        : SERVER_BASE_URL2_PHP + '/SuperManager/checkUser',
    sm_gym_addCashier          : SERVER_BASE_URL2_PHP + '/SuperManager/addCashier',
    sm_gym_setCashierReceiveMsg: SERVER_BASE_URL2_PHP + '/SuperManager/setCashierReceiveMsg',
    sm_gym_bindCashier         : SERVER_BASE_URL2_PHP + '/SuperManager/bindCashier',
    sm_gym_removeCashier       : SERVER_BASE_URL2_PHP + '/SuperManager/lockCashier',
    sm_gym_withdraw            : SERVER_BASE_URL2_PHP + '/SuperManager/withdrawals',
    sm_gym_withdrawList        : SERVER_BASE_URL2_PHP + '/Withdrawal/withdrawalList'
  })
  .constant('AUTH_EVENTS', {
    loginSuccess    : 'auth-login-success',
    loginFailed     : 'auth-login-failed',
    logoutSuccess   : 'auth-logout-success',
    sessionTimeout  : 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized   : 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    all             : '*',
    hotsportsManager: 'hotsportsManager',
    superManager    : 'superManager',
    cashier         : 'cashier'
  })
  .service('Session', function ($log, $window) {
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
  })
  .factory('Alerts', function ($anchorScroll) {
    return {
      showAlert: function (scope, type, content, dismiss, autoclose, delay) {
        scope.alertType = type;
        scope.alertMsg = content;
        scope.alertDismiss = dismiss;
        scope.alertAutoClose = autoclose;
        scope.alertCloseDelay = delay;
        $anchorScroll('alert1');
      }
    };
  })
  .factory('PromiseCallback', function ($log, $q, $rootScope, AUTH_EVENTS) {
    return {
      successCallback: function (response) {
        $log.debug(response);
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
        //$log.debug(response);
        return $q.reject(response.data);
      }
    };
  })
  .provider('RouteAuthResolve', function () {
    this.auth = function (authorizedRoles) {
      return ['$log', '$q', 'USER_ROLES', 'AuthService', function ($log, $q, USER_ROLES, AuthService) {
        if (!AuthService.isAuthorized(authorizedRoles)) {
          if (AuthService.isAuthenticated()) {
            // user is not allowed
            return $q.reject({authorized: false});
          } else {
            // user is not logged in
            return $q.reject({authenticated: false});
          }
        } else {
          return $q.when(AuthService.isAuthorized(authorizedRoles));
        }
      }];
    };
    this.$get = function () {
      //return {};
    };
  })
  .factory('httpInterceptor', ['$log', '$q', '$injector', function ($log, $q, $injector) {
    var httpInterceptor = {
      'responseError': function (response) {
        //$log.debug('responseError: ', response);
        return $q.reject(response);
      },
      'response'     : function (response) {
        if (response.data.errCode == 2001) {
          $log.debug(response);
          $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);
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
    return httpInterceptor;
  }]);
