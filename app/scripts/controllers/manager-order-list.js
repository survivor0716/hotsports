'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:ManagerorderlistCtrl
 * @description
 * # ManagerorderlistCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .config(['$routeProvider', 'USER_ROLES', 'RouteAuthResolveProvider', function ($routeProvider, USER_ROLES, RouteAuthResolveProvider) {
    //Note that Angular appends 'Provider' to then end of the provider name
    $routeProvider
      .when('/manager/order-list', {
        templateUrl : 'views/sm-order-list.html',
        controller  : 'ManagerorderlistCtrl',
        controllerAs: 'managerOrderList',
        resolve     : {
          'auth'           : RouteAuthResolveProvider.auth([USER_ROLES.cashier]),
          'gymOrderData'   : ['$q', '$route', 'SuperManagerService', 'QueryFilterService', function ($q, $route, SuperManagerService, QueryFilterService) {
            QueryFilterService.setQueryFilter({}, 'ManagerorderlistCtrl');
            return SuperManagerService.gymOrder(QueryFilterService.getQueryFilter())
              .then(function (data) {
                return $q.resolve(data);
              }, function (errMsg) {
                //TODO: $routeChangeError event
                return $q.reject(errMsg);
              });

          }]
        }
      });
  }])
  .controller('ManagerorderlistCtrl', function ($log, $window, $scope, $route, gymOrderData, Session, QueryFilterService) {
    $scope.setCurrentPath('#/manager/order-list');
    $log.debug('场馆订单数据: ', gymOrderData);
    var queryFilter = QueryFilterService.getQueryFilter();
    $scope.list = gymOrderData.orderList;
    $scope.row = 10;
    $scope.currentPage = queryFilter.page || 1;
    $scope.totalPage = Math.ceil(gymOrderData.total / $scope.row);
    $scope.gid = queryFilter.gid;
    $scope.out_trade_no = queryFilter.out_trade_no || null;

    //设置订单条件
    $scope.loadPage = function (page) {
      QueryFilterService.setQueryFilter({page: page}, 'ManagerorderlistCtrl');
      $route.reload();
    };

    $scope.searchOrder = function () {
      var params = {
        page        : $scope.currentPage = 1,
        out_trade_no: $scope.out_trade_no || null
      };
      QueryFilterService.setQueryFilter(params, 'ManagerorderlistCtrl');
      $route.reload();
    };

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

    createPageLinks();

    $scope.isPage = function (num) {
      return $scope.currentPage == num;
    };
  });
