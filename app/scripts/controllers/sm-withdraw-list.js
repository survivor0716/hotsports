'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:SmwithdrawlistCtrl
 * @description
 * # SmwithdrawlistCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .config(['$routeProvider', 'USER_ROLES', 'RouteAuthResolveProvider', function ($routeProvider, USER_ROLES, RouteAuthResolveProvider) {
    //Note that Angular appends 'Provider' to then end of the provider name
    $routeProvider
      .when('/sm/withdraw-list', {
        templateUrl : '../../views/hs/hs-todo-withdraw.html',
        controller  : 'SmwithdrawlistCtrl',
        controllerAs: 'smWithdrawList',
        resolve     : {
          'auth'       : RouteAuthResolveProvider.auth(USER_ROLES.superManager)
          //'processingListData': ['$q', 'HotSportsManagerService', function ($q, HotSportsManagerService) {
          //  return HotSportsManagerService.withdraw({status: 'TRADE_PROCESSING'})
          //    .then(function (data) {
          //      return $q.resolve(data);
          //    }, function (errMsg) {
          //      //TODO: $routeChangeError event
          //      return $q.reject(errMsg);
          //    });
          //}],
          //'verifiedListData': ['$q', 'HotSportsManagerService', function ($q, HotSportsManagerService) {
          //  return HotSportsManagerService.withdraw({status: 'TRADE_SUCCESS'})
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
  .controller('HstodowithdrawCtrl', function ($log, $window, $scope, $route, HotSportsManagerService, QueryFilterService) {
    $scope.setCurrentPath('#/sm/withdraw-list');

    $scope.processingList = {
      data: null,
      currentPage: 1,
      totalPage: null,
      row: 10,
      pages: null
    };

    $scope.loadProcessingList = function (page) {
      QueryFilterService.setQueryFilter({status: 'TRADE_PROCESSING', page: page, row: $scope.processingList.row}, 'HstodocoachCtrl_ProcessingList');
      HotSportsManagerService.withdraw(QueryFilterService.getQueryFilter())
        .then(function (data) {
          $log.debug('获取提现申请列表成功', data);
          $scope.processingList.data = data.withdrawalList;
          $scope.processingList.currentPage = page;
          $scope.processingList.totalPage = Math.ceil(data.total / $scope.processingList.row);
          $scope.processingList.pages = createPageLinks($scope.processingList.currentPage, $scope.processingList.totalPage);
        }, function (errMsg) {
          $log.debug('获取提现申请列表失败', errMsg);
          $window.alert(errMsg);
        });
    };

    $scope.loadProcessingList($scope.processingList.currentPage);
    $scope.loadVerifiedList($scope.verifiedList.currentPage);

    var createPageLinks = function (currentPage, totalPage) {
      //生成数字链接
      if (currentPage > 1 && currentPage < totalPage) {
        return [
          currentPage - 1,
          currentPage,
          currentPage + 1
        ];
      } else if (currentPage === 1 && totalPage > 1) {
        return [
          currentPage,
          currentPage + 1
        ];
      } else if (currentPage === totalPage && totalPage > 1) {
        return [
          currentPage - 1,
          currentPage
        ];
      } else {
        return [
          currentPage
        ];
      }
    };

    $scope.isPage = function (currentPage, num) {
      return currentPage === num;
    };


  });
