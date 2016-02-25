'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:HsgymlistCtrl
 * @description
 * # HsgymlistCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('HsgymlistCtrl', function ($log, $window, $scope, $http, $q, $routeParams, ServiceConfig, PromiseCallback, QueryFilterService) {
    $scope.setCurrentPath('#/hs/gym-list');

    $scope.currentPage = parseInt($routeParams.page) || 1;
    $scope.totalPage = null;
    $scope.row = 10;
    $scope.pages = [];
    //TODO: resolve
    var loadData = function () {
      QueryFilterService.setQueryFilter({page: $scope.currentPage}, 'HsgymlistCtrl');
      $http.post(ServiceConfig.hs_gym_list, QueryFilterService.getQueryFilter(), {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback)
        .then(function (data) {
          $log.debug('获取场馆列表成功', data);
          $scope.list = data.gymList;
          $scope.totalPage = Math.ceil(data.total / $scope.row);
          createPageLinks();
        }, function (errMsg) {
          $log.debug('获取场馆列表失败', errMsg);
          $window.alert(errMsg);
        });
    };

    loadData();

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
