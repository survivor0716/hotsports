'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:HsgymcreateCtrl
 * @description
 * # HsgymcreateCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('HsgymcreateCtrl', function ($log, $window, $scope, $route, HotSportsManagerService) {
    $scope.setCurrentPath('#/hs/gym-post');

    $scope.typeList = [];

    $scope.selectedType = [];

    $scope.disableSubmitBtn = false;

    HotSportsManagerService.sportType()
      .then(function (data) {
        $scope.typeList = data;
        for (var i in $scope.typeList) {
          $scope.typeList[i].currentSrc = $scope.typeList[i].imgUnSelected;
        }
        $log.debug('获取场馆类型列表成功', $scope.typeList);
      }, function (errMsg) {
        $log.debug('获取场馆类型列表失败', errMsg);
        $window.alert(errMsg);
      });

    $scope.submitAddGYm = function () {
      $scope.disableSubmitBtn = true;
      var params = {
        name      : $scope.name,
        tel       : $scope.tel,
        province  : $scope.province,
        city      : $scope.city,
        district  : $scope.district,
        street    : $scope.street,
        addrDetail: $scope.addr,
        lat       : $scope.lat,
        lng       : $scope.lng,
        sportType : $scope.selectedType
      };
      $log.debug('创建场馆请求参数', params);
      HotSportsManagerService.addGym(params)
        .then(function (data) {
          $log.debug('创建场馆成功', data);
          $window.alert('创建场馆成功');
          $route.reload();
        }, function (errMsg) {
          $log.debug('创建场馆失败', errMsg);
          $window.alert(errMsg);
          $scope.disableSubmitBtn = false;
        });
    };

    $scope.toggleImage = function (type) {
      type.currentSrc = type.currentSrc === type.imgUnSelected ? type.imgSelected : type.imgUnSelected;

      if ($scope.selectedType.indexOf(type.id) === -1) {
        $scope.selectedType.push(type.id);
      } else {
        $scope.selectedType.splice($scope.selectedType.indexOf(type.id), 1);
      }
    };
  });
