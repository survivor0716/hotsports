'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:HstodowithdrawedCtrl
 * @description
 * # HstodowithdrawedCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .config(['$routeProvider', 'USER_ROLES', 'RouteAuthResolveProvider', function ($routeProvider, USER_ROLES, RouteAuthResolveProvider) {
    //Note that Angular appends 'Provider' to then end of the provider name
    $routeProvider
      .when('/hs/todo/withdrawed', {
        templateUrl : '../../views/hs/hs-todo-withdrawed.html',
        controller  : 'HstodowithdrawedCtrl',
        controllerAs: 'hsTodoWithdrawed',
        resolve     : {
          'auth'       : RouteAuthResolveProvider.auth(USER_ROLES.hotsportsManager)
  //        //'processingListData': ['$q', 'HotSportsManagerService', function ($q, HotSportsManagerService) {
  //        //  return HotSportsManagerService.withdraw({status: 'TRADE_PROCESSING'})
  //        //    .then(function (data) {
  //        //      return $q.resolve(data);
  //        //    }, function (errMsg) {
  //        //      //TODO: $routeChangeError event
  //        //      return $q.reject(errMsg);
  //        //    });
  //        //}],
  //        //'verifiedListData': ['$q', 'HotSportsManagerService', function ($q, HotSportsManagerService) {
  //        //  return HotSportsManagerService.withdraw({status: 'TRADE_SUCCESS'})
  //        //    .then(function (data) {
  //        //      return $q.resolve(data);
  //        //    }, function (errMsg) {
  //        //      //TODO: $routeChangeError event
  //        //      return $q.reject(errMsg);
  //        //    });
  //        //}]
        }
      });
  }])
  .controller('HstodowithdrawedCtrl', function ($log, $window, $scope, $route, HotSportsManagerService, QueryFilterService) {
    $scope.setCurrentPath('#/hs/todo/withdraw');

    $scope.handleWithdraw = function (id) {
      HotSportsManagerService.handleWithdraw({wid: id})
        .then(function (data) {
          $log.debug(data);
          $route.reload();
        }, function (errMsg) {
          $window.alert(errMsg);
        });
    };

    $scope.setCurrentWidthdraw = function (data) {
      $scope.currentAccountInfo= data.accountInfo;
      $scope.currentWithdrawId = data.id;
    };

    $scope.processingList = {
      data: null,
      currentPage: 1,
      totalPage: null,
      row: 10,
      pages: null
    };

    $scope.verifiedList = {
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

    $scope.loadVerifiedList = function (page) {
      QueryFilterService.setQueryFilter({status: 'TRADE_SUCCESS', page: page, row: $scope.verifiedList.row}, 'HstodocoachCtrl_VerifiedList');
      HotSportsManagerService.withdraw(QueryFilterService.getQueryFilter())
        .then(function (data) {
          $log.debug('获取完成提现列表成功', data);
          $scope.verifiedList.data = data.withdrawalList;
          $scope.verifiedList.currentPage = page;
          $scope.verifiedList.totalPage = Math.ceil(data.total / $scope.verifiedList.row);
          $scope.verifiedList.pages = createPageLinks($scope.verifiedList.currentPage, $scope.verifiedList.totalPage);
        }, function (errMsg) {
          $log.debug('获取完成提现列表失败', errMsg);
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
      } else if (currentPage == 1 && totalPage > 1) {
        return [
          currentPage,
          currentPage + 1
        ];
      } else if (currentPage == totalPage && totalPage > 1) {
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
      return currentPage == num;
    };


  });

