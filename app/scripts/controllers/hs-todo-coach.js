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
  .controller('HstodocoachCtrl', function ($log, $window, $scope, $routeParams, HotSportsManagerService, ServiceConfig, QueryFilterService, getListDataService) {
    $scope.setCurrentPath('#/hs/todo/coach');

    $scope.listData = null;
    $scope.currentPage = parseInt($routeParams.page) || 1;
    $scope.totalPage = null;
    $scope.row = 1;
    $scope.pages = [];
    var queryParams = {
      status: 'NOT_VERIFY',
      page  : $scope.currentPage,
      row   : $scope.row
    };

    getListDataService.post(ServiceConfig.hs_todo_coach, queryParams)
      .then(function (data) {
        $log.debug('获取教练申请列表成功', data);
        $scope.listData = data.coachList;
        $scope.totalPage = Math.ceil(data.total / $scope.row);
        $scope.pages = getListDataService.createPageLinks($scope.currentPage, $scope.totalPage);
      }, function (errMsg) {
        $log.debug('获取教练申请列表失败', errMsg);
        $window.alert(errMsg);
      });

    $scope.isPage = function (num) {
      return $scope.currentPage == num;
    };

  });
