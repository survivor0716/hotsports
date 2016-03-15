'use strict';

/**
 * @ngdoc overview
 * @name hotsportsApp
 * @description
 * # hotsportsApp
 *
 * Main module of the application.
 */
angular
  .module('hotsportsApp', [
    //'ngAnimate',
    //'ngCookies',
    //'ngResource',
    'ngRoute'
    //'ngSanitize',
    //'ngTouch'
  ], function ($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

      for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if (value instanceof Object) {
          for (subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if (value !== undefined && value !== null) {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }

      return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
  })
  .config(['$logProvider', '$httpProvider', '$routeProvider', 'USER_ROLES', function ($logProvider, $httpProvider, $routeProvider, USER_ROLES) {
    ////去除url中总是默认带有"#"
    //$locationProvider.html5Mode({<script src="../bower_components/angular-i18n/angular-locale_zh-cn.js"></script>
    //  enabled: true,
    //  requireBase: false
    //});
    $logProvider.debugEnabled(true);

    $httpProvider.interceptors.push('httpInterceptor');

    var authPromise = function (authorizedRoles) {
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
          return $q.when(true);
        }
      }];
    };
    $routeProvider
      .when('/', {
        templateUrl : 'views/main.html',
        controller  : 'MainCtrl',
        controllerAs: 'main',
        resolve     : {
          auth: authPromise('*')
        }
      })
      .when('/about', {
        templateUrl : 'views/about.html',
        controller  : 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/contact', {
        templateUrl : 'views/contact.html',
        controller  : 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/login', {
        templateUrl : 'views/login.html',
        controller  : 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/coach', {
        templateUrl : 'views/coach.html',
        controller  : 'CoachCtrl',
        controllerAs: 'coach',
        resolve     : {
          auth: authPromise(USER_ROLES.hotsportsManager)
        }
      })
      .when('/coach/info', {
        templateUrl : 'views/coach-info.html',
        controller  : 'CoachInfoCtrl',
        controllerAs: 'coachInfo',
        resolve     : {
          auth: authPromise(USER_ROLES.hotsportsManager)
        }
      })
      .when('/gym', {
        templateUrl : 'views/gym.html',
        controller  : 'GymCtrl',
        controllerAs: 'gym',
        resolve     : {
          auth: authPromise(USER_ROLES.hotsportsManager)
        }
      })
      .when('/gym/info', {
        templateUrl : 'views/gym-info.html',
        controller  : 'GymInfoCtrl',
        controllerAs: 'gymInfo',
        resolve     : {
          auth   : authPromise(USER_ROLES.hotsportsManager),
          hasInfo: function ($q, GymService) {
            if (!GymService.getCurrentGym()) {
              return $q.reject('无场馆信息');
            }
          }
        }
      })
      .when('/coach/list', {
        templateUrl : 'views/coach-list.html',
        controller  : 'CoachListCtrl',
        controllerAs: 'coachList',
        resolve     : {
          auth: authPromise(USER_ROLES.hotsportsManager)
        }
      })
      .when('/feedback', {
        templateUrl : 'views/feedback.html',
        controller  : 'FeedbackCtrl',
        controllerAs: 'feedback',
        resolve     : {
          auth: authPromise(USER_ROLES.hotsportsManager)
        }
      })
      .when('/resource', {
        templateUrl : 'views/resource.html',
        controller  : 'ResourceCtrl',
        controllerAs: 'resource',
        resolve     : {
          auth: authPromise(USER_ROLES.hotsportsManager)
        }
      })
      .when('/resource/videos', {
        templateUrl : 'views/res-videos.html',
        controller  : 'ResVideosCtrl',
        controllerAs: 'resVideos',
        resolve     : {
          auth: authPromise(USER_ROLES.hotsportsManager)
        }
      })
      .when('/resource/videos/details', {
        templateUrl : 'views/res-video-details.html',
        controller  : 'ResVideoDetailsCtrl',
        controllerAs: 'resVideoDetails',
        resolve     : {
          auth: authPromise(USER_ROLES.hotsportsManager)
        }
      })
      .when('/gym/list/:page?', {
        templateUrl : 'views/gym-list.html',
        controller  : 'GymListCtrl',
        controllerAs: 'gymList',
        resolve     : {
          auth: authPromise(USER_ROLES.hotsportsManager)
        }
      })
      .when('/manager/qrcode', {
        templateUrl : 'views/manager-qrcode.html',
        controller  : 'ManagerQrcodeCtrl',
        controllerAs: 'managerQrcode',
        resolve     : {
          auth: authPromise([USER_ROLES.cashier])
        }
      })
      .when('/gym/order', {
        templateUrl : 'views/gym-order.html',
        controller  : 'GymorderCtrl',
        controllerAs: 'gymOrder',
        resolve     : {
          'auth': authPromise(USER_ROLES.hotsportsManager)
        }
      })
      .when('/gym/detail', {
        templateUrl : 'views/gym-detail.html',
        controller  : 'GymdetailCtrl',
        controllerAs: 'gymDetail',
        resolve     : {
          'auth': authPromise(USER_ROLES.hotsportsManager)
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .run(function ($log, $window, $timeout, $rootScope, $location, $route, AuthService, AUTH_EVENTS, Session, USER_ROLES, $anchorScroll) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      $log.debug('$routeChangeStart');
      $timeout(function () {
        event.preventDefault();
      }, 1000);
      //var authorizedRoles = next.data.authorizedRoles;
      //$log.debug(authorizedRoles);
      //if (!AuthService.isAuthorized(authorizedRoles)) {
      //  event.preventDefault();
      //  if (AuthService.isAuthenticated()) {
      //    // user is not allowed
      //    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      //  } else {
      //    // user is not logged in
      //    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      //  }
      //}
    });

    $rootScope.$on("routeChangeSuccess", function (event, current, previous) {
      //$log.debug('routeChangeSuccess');
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
      $log.debug(rejection);
      if (rejection.authenticated === false) {
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);

      }
      if (rejection.authorized === false) {
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    });

    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
      $log.debug('$broadcast \'未登录\' 回调: 返回或弹出登录页');
      $location.path('/login');
    });

    $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
      $log.debug('$broadcast \'无权限\' 回调: 提示错误信息');
      $window.alert('无访问权限');
    });

    $rootScope.$on(AUTH_EVENTS.loginFailed, function () {
      $log.debug('$broadcast \'登录失败\' 回调: 提示错误信息');
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, userRole) {
      switch (userRole) {
        case USER_ROLES.hotsportsManager:
          $location.path('/main');
          break;
        case USER_ROLES.superManager:
          $location.path('/sm/gym-list');
          break;
        case USER_ROLES.cashier:
          $location.path('/manager/qrcode');
          break;
        //case USER_ROLES.assistant:
        //  $location.path('/main');
        //  break;
        //case USER_ROLES.coach:
        //  $location.path('/main');
        //  break;
      }
    });
    $rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
      $log.debug('$broadcast \'session失效，即将返回登录页面\' 回调: 返回或弹出登录页');
      //$window.alert('session失效，即将返回登录页面');
      Session.destroy();
      $location.path('/login');
    });
    $anchorScroll.yOffset = 80;
  });
