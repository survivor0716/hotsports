'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:HsgymdetailCtrl
 * @description
 * # HsgymdetailCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .config(['$routeProvider', 'USER_ROLES', 'RouteAuthResolveProvider', function ($routeProvider, USER_ROLES, RouteAuthResolveProvider) {
    //Note that Angular appends 'Provider' to then end of the provider name
    $routeProvider
      .when('/hs/gym/:gymid', {
        templateUrl : 'views/hs-gym-detail.html',
        controller  : 'HsgymdetailCtrl',
        controllerAs: 'hsGymDetail',
        resolve     : {
          'auth'      : RouteAuthResolveProvider.auth([USER_ROLES.hotsportsManager]),
          'detailData': ['$q', '$route', 'HotSportsManagerService', function ($q, $route, HotSportsManagerService) {
            var params = {gid: $route.current.params.gymid};
            return HotSportsManagerService.gymDetail(params)
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
  .controller('HsgymdetailCtrl', function ($log, $window, $scope, $http, $q, $route, $routeParams, ServiceConfig, HotSportsManagerService, PromiseCallback, detailData) {
    $scope.setCurrentPath('#/hs/gym');
    $log.debug('场馆详情:', detailData);
    $scope.gymData = detailData.gym;
    $scope.gymType = detailData.type;
    $scope.superManagerData = detailData.superManager;
    $scope.cashierData = detailData.cashier;
    $scope.accountData = detailData.account;

    //默认参数
    $scope.gym = {
      withdrawCount      : parseInt($scope.gymData.withdrawalCount),
      withdrawLimit      : parseInt($scope.gymData.withdrawalLimit),
      showEditPanelStatus: false
    };
    $scope.sm = {
      phone     : null,
      nickName  : null,
      sex       : null,
      receiveMsg: true
    };
    $scope.account = {
      num             : null,
      name            : null,
      bank            : null,
      bankCode        : null,
      type            : 'PERSONAL',
      phone           : null,
      isDefaultAccount: false
    };

    $scope.showNext = false;
    $scope.tab = 1;
    $scope.selectedType = [];
    for (var i in $scope.gymType)
      $scope.selectedType.push($scope.gymType[i].id);

    //选择tab页
    $scope.setTab = function (tab) {
      $scope.tab = tab;
      $scope.gym.showEditPanelStatus = false;
    };

    HotSportsManagerService.sportType()
      .then(function (data) {
        $log.debug('获取场馆类型列表成功', data);
        $scope.typeList = data;
        $log.debug($scope.selectedType);
        for (var i in $scope.typeList) {
          if ($scope.selectedType.indexOf($scope.typeList[i].id) !== -1) {
            $scope.typeList[i].currentSrc = $scope.typeList[i].imgSelected;
          } else {
            $scope.typeList[i].currentSrc = $scope.typeList[i].imgUnSelected;
          }
        }
      }, function (errMsg) {
        $log.debug('获取场馆类型列表失败', errMsg);
        $window.alert(errMsg);
      });

    //修改场馆信息
    $scope.submit = function () {
      $scope.disableSubmitBtn = true;
      var params = {
        id       : $scope.gymData.id,
        name     : $scope.gymData.name,
        tel      : $scope.gymData.tel,
        province : $scope.gymData.province,
        city     : $scope.gymData.city,
        district : $scope.gymData.district,
        street   : $scope.gymData.street,
        addDetail: $scope.gymData.addDetail,
        lat      : $scope.gymData.lat,
        lng      : $scope.gymData.lng,
        sportType: $scope.selectedType,
        detailUrl: $scope.gymData.detailUrl
      };
      $log.debug('修改场馆请求参数', params);
      HotSportsManagerService.editGym(params)
        .then(function (data) {
          $log.debug('修改场馆成功', data);
          $window.alert('修改场馆成功');
          $route.reload();
        }, function (errMsg) {
          $log.debug('修改场馆失败', errMsg);
          $window.alert(errMsg);
          $scope.disableSubmitBtn = false;
        });
    };

    //验证欲添加场馆管理员是否存在
    $scope.submitCheckUser = function () {
      var params = {
        phone: $scope.sm.phone
      };
      $log.debug('checkUser请求参数', params);
      HotSportsManagerService.checkUser(params)
        .then(function (data) {
          if (data.uid) {
            $scope.uid = data.uid;
            $scope.sm.nickName = data.nickName;
            $scope.sm.sex = data.sex;
            $scope.smExist = true;
          } else {
            $scope.smExist = false;
          }
          $scope.showNext = true;
        }, function (errMsg) {
          $log.debug('Check User 错误: ', errMsg);
          $window.alert(errMsg);
        });

    };

    //添加场馆管理员
    $scope.submitAddSuperManager = function () {
      var params = {
        gid       : $scope.gymData.id,
        phone     : $scope.sm.phone,
        nickName  : $scope.sm.nickName,
        sex       : $scope.sm.sex || 0,
        receiveMsg: $scope.sm.receiveMsg
      };
      $log.debug('添加场馆管理员请求参数', params);
      HotSportsManagerService.addSuperManager(params)
        .then(function (data) {
          $log.debug('添加场馆管理员成功', data);
          $window.alert('添加场馆管理员成功');

          $scope.superManagerData = data;
          $scope.resetAddSuperManagerForm();
        }, function (errMsg) {
          $log.debug('添加场馆管理员失败', errMsg);
          $window.alert(errMsg);
        });
    };

    //绑定场馆管理员
    $scope.submitBindSuperManager = function (status) {
      var params = {
        gid       : $scope.gymData.id,
        uid       : $scope.uid,
        receiveMsg: $scope.sm.receiveMsg
      };
      $log.debug('绑定场馆管理员请求参数', params);
      HotSportsManagerService.bindSuperManager(params)
        .then(function (data) {
          $log.debug('绑定场馆管理员员成功', data);
          $window.alert('绑定场馆管理员员成功');
          //Alerts.showAlert($scope, 'alert-success', '绑定场馆管理员成功', true, true, 3);

          $scope.superManagerData = data;
          $scope.resetAddSuperManagerForm();
        }, function (errMsg) {
          $log.debug('绑定场馆管理员失败', errMsg);
          $window.alert(errMsg);
          //Alerts.showAlert($scope, 'alert-danger', errMsg, true, true, 3);
        });
    };

    //reset添加管理员表单
    $scope.resetAddSuperManagerForm = function () {
      $scope.account = {
        phone     : null,
        nickName  : null,
        sex       : 0,
        receiveMsg: true
      };
      $scope.showNext = false;
    };

    //添加提现帐户
    $scope.submitAddAccountInfo = function () {
      var params = {
        gid     : $scope.gymData.id,
        accNum  : $scope.account.num,
        accName : $scope.account.name,
        accBank : $scope.account.bank,
        bankCode: $scope.account.bankCode,
        type    : $scope.account.type,
        phone   : $scope.account.phone,
        default : $scope.account.isDefaultAccount
      };
      $log.debug(params);
      $http.post(ServiceConfig.hs_gym_account_add, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback)
        .then(function (data) {
          $log.debug('添加提现账户成功', data);
          $window.alert('添加提现账户成功');
          $route.reload();
        }, function (errMsg) {
          $log.debug('添加提现账户失败', errMsg);
          $window.alert(errMsg);
        });
    };

    //设置提现账户参数
    $scope.submitEditWithdrawSettings = function () {
      var params = {
        gid  : $scope.gymData.id,
        limit: $scope.gym.withdrawLimit,
        count: $scope.gym.withdrawCount
      };
      $log.debug(params);
      HotSportsManagerService.setWithdraw(params)
        .then(function (data) {
          $log.debug('修改提现参数成功', data);
          $window.alert('修改提现参数成功');
          $route.reload();
        }, function (errMsg) {
          $log.debug('修改提现参数失败', errMsg);
          $window.alert(errMsg);
        });
    };

    $scope.showEditPanel = function () {
      $scope.gym.showEditPanelStatus = true;
    };

    $scope.hideEditPanel = function () {
      $scope.gym.showEditPanelStatus = false;
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

  });
