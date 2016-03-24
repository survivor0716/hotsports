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
      .when('/hs/todo/coach', {
        templateUrl : 'views/hs-todo-coach.html',
        controller  : 'HstodocoachCtrl',
        controllerAs: 'hsTodoCoach',
        resolve     : {
          'auth': RouteAuthResolveProvider.auth(USER_ROLES.hotsportsManager)
        }
      });
  }])
  .controller('HstodocoachCtrl', function ($log, $window, $scope, $routeParams, ServiceConfig, getListDataService) {
    $scope.setCurrentPath('#/hs/todo/coach');
    $scope.paginationConf = {
      currentPage: 1,
      totalItems : null,
      totalPage  : null,
      maxSize    : 5,
      row        : 10
      //TODO: 这部分移到directive中
      //pages      : [],
      //isPage     : function (num) {
      //  return this.currentPage == num;
      //}
    };

    $scope.listData = null;

    $scope.pageChanged = function () {
      var queryParams = {
        status: 'NOT_VERIFY',
        page  : $scope.paginationConf.currentPage,
        row   : $scope.paginationConf.row
      };
      getListDataService.post(ServiceConfig.hs_todo_coach, queryParams)
        .then(function (data) {
          $log.debug('获取教练申请列表成功', data);
          $scope.listData = data.coachList;
          $scope.paginationConf.totalItems = data.total;
          $scope.paginationConf.totalPage = Math.ceil(data.total / $scope.paginationConf.row);
          //TODO: 这部分移到directive中
          //$scope.paginationConf.pages = getListDataService.createPageLinks($scope.paginationConf.currentPage, $scope.paginationConf.totalPage);
        }, function (errMsg) {
          $log.debug('获取教练申请列表失败', errMsg);
          $window.alert(errMsg);
        });
    };
    $scope.pageChanged();
  });
