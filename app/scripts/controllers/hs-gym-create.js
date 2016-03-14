'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:HsgymcreateCtrl
 * @description
 * # HsgymcreateCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .config(['$routeProvider', 'USER_ROLES', 'RouteAuthResolveProvider', function ($routeProvider, USER_ROLES, RouteAuthResolveProvider) {
    //Note that Angular appends 'Provider' to then end of the provider name
    $routeProvider
      .when('/hs/gym-post', {
        templateUrl : 'views/hs-gym-create.html',
        controller  : 'HsgymcreateCtrl',
        controllerAs: 'hsGymCreate',
        resolve     : {
          'auth': RouteAuthResolveProvider.auth([USER_ROLES.hotsportsManager])
        }
      });
  }])
  .controller('HsgymcreateCtrl', function ($log, $window, $scope, $route, HotSportsManagerService) {
    $scope.setCurrentPath('#/hs/gym-post');

    $scope.typeList = [];

    $scope.selectedType = [];

    $scope.disableSubmitBtn = false;

    HotSportsManagerService.sportType()
      .then(function (data) {
        $log.debug('获取场馆类型列表成功', data);
        $scope.typeList = data;
        for (var i in $scope.typeList) {
          $scope.typeList[i].currentSrc = $scope.typeList[i].imgUnSelected;
        }
      }, function (errMsg) {
        $log.debug('获取场馆类型列表失败', errMsg);
        $window.alert(errMsg);
      });

    $scope.gymData = {
      name        : $scope.name,
      tel         : $scope.tel,
      province    : $scope.province,
      city        : $scope.city,
      district    : $scope.district,
      street      : $scope.street,
      addDetail   : $scope.addDetail,
      lat         : $scope.lat,
      lng         : $scope.lng,
      selectedType: $scope.selectedType,
      detailUrl   : $scope.detailUrl
    };
    $scope.submit = function () {
      $scope.disableSubmitBtn = true;
      var params = {
        name     : $scope.gymData.name,
        tel      : $scope.gymData.tel,
        province : $scope.gymData.province,
        city     : $scope.gymData.city,
        district : $scope.gymData.district,
        street   : $scope.gymData.street,
        addDetail: $scope.gymData.addDetail,
        lat      : $scope.gymData.lat,
        lng      : $scope.gymData.lng,
        sportType: $scope.gymData.selectedType,
        detailUrl: $scope.gymData.detailUrl
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
      $log.debug($scope.selectedType);
    };

    //$scope.isSelected = function (type) {
    //  if (type.id in $scope.selectedType)
    //    return type.imgSelected;
    //  return type.imgUnSelected;
    //}
  });
