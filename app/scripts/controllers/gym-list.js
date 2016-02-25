'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:GymListCtrl
 * @description
 * # GymListCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('GymListCtrl', function ($log, $window, $scope, $http, $route, $routeParams, $location, GymService, QueryFilterService) {
    $scope.setCurrentPath('#/gym/list');

    $scope.gymTerms = {
      id           : false,
      name         : true,
      lat          : false,
      lng          : false,
      tel          : false,
      createTime   : false,
      province     : true,
      city         : true,
      district     : true,
      street       : false,
      addressDetail: true,
      administrator: false,
      qrcode       : false,
      amapType     : true,
      amapId       : true,
      adcode       : false,
      citycode     : false,
      pcode        : false,
      type         : true,
      status       : true,
      time         : false
    };

    $scope.query = QueryFilterService.getQueryFilter() || {};

    //初始设置
    $scope.gyms = null;
    $scope.currentPage = parseInt($routeParams.page) || 1;
    $scope.row = 25;
    $scope.totalPage = 0;
    $scope.amapTypeSelected1 = GymService.type1.name || '一级类别';
    $scope.amapTypeSelected2 = GymService.type2.name || '二级类别';
    $scope.amapTypeSelected3 = GymService.type3.name || '三级类别';
    $scope.amapTypeList1 = GymService.typeList1.getList();
    $scope.amapTypeList2 = GymService.typeList2.getList();
    $scope.amapTypeList3 = GymService.typeList3.getList();

    GymService.getTypeList1().then(function (data) {
      $scope.amapTypeList1 = GymService.typeList1.listArray = data;
    });

    var createPageLinks = function () {
      //生成数字链接
      if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
        $scope.pages = [
          $scope.currentPage - 1,
          $scope.currentPage,
          $scope.currentPage + 1
        ];
      } else if ($scope.currentPage === 1 && $scope.totalPage > 1) {
        $scope.pages = [
          $scope.currentPage,
          $scope.currentPage + 1
        ];
      } else if ($scope.currentPage === $scope.totalPage && $scope.totalPage > 1) {
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
      return $scope.currentPage === num;
    };

    var load = function () {
      QueryFilterService.setQueryFilter({page: $scope.currentPage, row: $scope.row}, 'GymListCtrl');
      GymService.getGymList(QueryFilterService.getQueryFilter())
        .then(function (data) {
          $scope.gyms = data.data;
          $scope.totalPage = data.totalPage;
          createPageLinks();
        }, function (errMsg) {
          $window.alert(errMsg);
        });
    };
    load();

    $scope.selectType1 = function (type) {
      GymService.type1.init(type);
      GymService.type2.empty();
      GymService.type3.empty();
      QueryFilterService.setQueryFilter({type1: type.id, type2: null, type3: null}, 'GymListCtrl');
      $scope.amapTypeSelected2 = '二级类别';
      $scope.amapTypeSelected3 = '三级类别';
      $scope.amapTypeList2 = $scope.amapTypeList3 = [{name: '无'}];
      $scope.amapTypeSelected1 = type.name;

      GymService.getTypeList2(type.id)
        .then(function (data) {
          $scope.amapTypeList2 = data;
        });
    };

    $scope.selectType2 = function (type) {
      GymService.type2.init(type);
      GymService.type3.empty();
      QueryFilterService.setQueryFilter({type2: type.id, type3: null}, 'GymListCtrl');
      $scope.amapTypeSelected3 = '三级类别';
      $scope.amapTypeList3 = [{name: '无'}];
      $scope.amapTypeSelected2 = type.name;

      GymService.getTypeList3(type.id)
        .then(function (data) {
          $scope.amapTypeList3 = data;
        });
    };

    $scope.selectType3 = function (type) {
      GymService.type3.init(type);
      QueryFilterService.setQueryFilter({type3: type.id}, 'GymListCtrl');
      $scope.amapTypeSelected3 = type.name;
    };

    $scope.lockGym = function (id) {
      GymService.lockGym(id).then(function () {
        $scope.load();
      });
    };

    $scope.lockAllGyms = function () {
      QueryFilterService.setQueryFilter({lockAll: true}, 'GymListCtrl');
      GymService.getGymList(QueryFilterService.getQueryFilter())
        .then(function (data) {
          $log.debug('锁定成功', data);
          QueryFilterService.setQueryFilter({lockAll: false}, 'GymListCtrl');
          $scope.load();
        });
    };

    $scope.showInfo = function (obj) {
      GymService.setCurrentGym(obj);
      $location.url('/gym/info');
    };

    $scope.search = function () {
      QueryFilterService.setQueryFilter($scope.query, 'GymListCtrl');
      $route.updateParams({page: 1});
      $route.reload();
    };
  });
