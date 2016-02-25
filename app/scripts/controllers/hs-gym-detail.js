'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:HsgymdetailCtrl
 * @description
 * # HsgymdetailCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('HsgymdetailCtrl', function ($log, $window, $scope, $http, $q, $route, $routeParams, ServiceConfig, HotSportsManagerService, PromiseCallback, detailData) {
    $log.debug('场馆详情:', detailData);
    $scope.gymData = detailData.gym;
    $scope.gymType = detailData.type;
    $scope.superManagerData = detailData.superManager;
    $scope.cashierData = detailData.cashier;
    $scope.accountData = detailData.account;

    $scope.withdrawCount = parseInt($scope.gymData.withdrawalCount);
    $scope.withdrawLimit = parseInt($scope.gymData.withdrawalLimit);

    //默认参数
    $scope.receiveMsg = true;
    $scope.accType = 'PERSONAL';
    $scope.isDefaultAccount = false;
    $scope.showNext = false;
    $scope.smPhone = null;

    //验证欲添加场馆管理员是否存在
    $scope.submitCheckUser = function () {
      var params = {
        phone: $scope.smPhone
      };
      $log.debug('checkUser请求参数', params);
      HotSportsManagerService.checkUser(params)
        .then(function (data) {
          if (data.uid) {
            $scope.uid = data.uid;
            $scope.smNickName = data.nickName;
            $scope.smSex = data.sex;
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
        phone     : $scope.smPhone,
        nickName  : $scope.smNickName,
        sex       : $scope.smSex || 0,
        receiveMsg: $scope.receiveMsg
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
        receiveMsg: $scope.receiveMsg
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

    //添加提现帐户
    $scope.resetAddSuperManagerForm = function () {
      $scope.showNext = false;
      $scope.smPhone = null;
      $scope.smNickName = null;
      $scope.smSex = 0;
      $scope.receiveMsg = true;
    };

    $scope.submitAddAccountInfo = function () {
      var params = {
        accNum  : $scope.accNum,
        accName : $scope.accName,
        accBank : $scope.accBank,
        bankCode: $scope.bankCode,
        type    : $scope.accType,
        phone   : $scope.accPhone,
        gid     : $scope.gymData.id,
        default : $scope.isDefaultAccount
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
        limit: $scope.withdrawLimit,
        count: $scope.withdrawCount
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
  });
