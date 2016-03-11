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
          'auth'       : RouteAuthResolveProvider.auth(USER_ROLES.hotsportsManager)
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
  .controller('HstodocoachCtrl', function ($log, $window, $scope, $routeParams, HotSportsManagerService, QueryFilterService) {
    $scope.setCurrentPath('#/hs/todo/coach');

    var queryParams = QueryFilterService.getQueryParams('HstodocoachCtrl');
    if(queryParams) {
      queryParams.page = $routeParams.page;
      $scope.row = queryParams.row;
    } else {
      $scope.currentPage = 1;
      $scope.row = 1;
      QueryFilterService.setQueryParams('HstodocoachCtrl', {status: 'NOT_VERIFY', page: $scope.currentPage, row: $scope.row});
      queryParams = QueryFilterService.getQueryParams('HstodocoachCtrl');
    }

    $scope.pages = [];


    $scope.loadPage = function () {
      HotSportsManagerService.coach(queryParams)
        .then(function (data) {
          $log.debug('获取教练申请列表成功', data);
          $scope.coach = data.coachList;
          $scope.totalPage = Math.ceil(data.total / $scope.row);
          createPageLinks();
        }, function (errMsg) {
          $log.debug('获取教练申请列表失败', errMsg);
          $window.alert(errMsg);
        });
    };

    $scope.loadPage();

    var createPageLinks = function () {
      //生成数字链接
      if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
        $scope.pages = [
          $scope.currentPage - 1,
          $scope.currentPage,
          $scope.currentPage + 1
        ];
      } else if ($scope.currentPage == 1 && $scope.totalPage > 1) {
        $scope.pages = [
          $scope.currentPage,
          $scope.currentPage + 1
        ];
      } else if ($scope.currentPage == $scope.totalPage && $scope.totalPage > 1) {
        $scope.pages = [
          $scope.currentPage - 1,
          $scope.currentPage
        ];
      } else {
        $scope.pages = [
          $scope.currentPage
        ];
      }
    };

    $scope.isPage = function (num) {
      return $scope.currentPage == num;
    };


  });
