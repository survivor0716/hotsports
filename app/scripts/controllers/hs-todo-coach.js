'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:HstodocoachCtrl
 * @description
 * # HstodocoachCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .config(['$routeProvider', 'USER_ROLES', 'RouteAuthResolveProvider', function ($routeProvider, USER_ROLES, RouteAuthResolveProvider) {
    //Note that Angular appends 'Provider' to then end of the provider name
    $routeProvider
      .when('/hs/todo/coach/page/:page?', {
        templateUrl : 'views/hs-todo-coach.html',
        controller  : 'HstodocoachCtrl',
        controllerAs: 'hsTodoCoach',
        resolve     : {
          'auth': RouteAuthResolveProvider.auth(USER_ROLES.hotsportsManager)
          //'todoListData': ['$q', 'HotSportsManagerService', function ($q, HotSportsManagerService) {
          //  return HotSportsManagerService.coach({status: 'NOT_VERIFY'})
          //    .then(function (data) {
          //      return $q.resolve(data);
          //    }, function (errMsg) {
          //      //TODO: $routeChangeError event
          //      return $q.reject(errMsg);
          //    });
          //}]
        }
      });
  }])
  .controller('HstodocoachCtrl', function ($log, $window, $scope, $routeParams, ServiceConfig, getListDataService) {
    $scope.setCurrentPath('#/hs/todo/coach');

    $scope.paginationConf = {
      currentPage: parseInt($routeParams.page) || 1,
      totalPage  : null,
      row        : 1,
      pages      : [],
      isPage     : function (num) {
        return this.currentPage == num;
      }
    };
    $scope.listData = null;
    var queryParams = {
      status: 'NOT_VERIFY',
      page  : $scope.paginationConf.currentPage,
      row   : $scope.paginationConf.row
    };

    getListDataService.post(ServiceConfig.hs_todo_coach, queryParams)
      .then(function (data) {
        $log.debug('获取教练申请列表成功', data);
        $scope.listData = data.coachList;
        $scope.paginationConf.totalPage = Math.ceil(data.total / $scope.paginationConf.row);
        $scope.paginationConf.pages = getListDataService.createPageLinks($scope.paginationConf.currentPage, $scope.paginationConf.totalPage);
      }, function (errMsg) {
        $log.debug('获取教练申请列表失败', errMsg);
        $window.alert(errMsg);
      });

  });
