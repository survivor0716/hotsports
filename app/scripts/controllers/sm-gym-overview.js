'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:SmgymoverviewCtrl
 * @description
 * # SmgymoverviewCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .config(['$routeProvider', 'USER_ROLES', 'RouteAuthResolveProvider', function ($routeProvider, USER_ROLES, RouteAuthResolveProvider) {
    //Note that Angular appends 'Provider' to then end of the provider name
    $routeProvider
      .when('/sm/gym-overview/:gymid?', {
        templateUrl : 'views/sm-gym-overview.html',
        controller  : 'SmgymoverviewCtrl',
        controllerAs: 'smGymOverview',
        resolve     : {
          'auth'           : RouteAuthResolveProvider.auth([USER_ROLES.superManager, USER_ROLES.manager]),
          'gymOverviewData': ['$q', '$route', 'SuperManagerService', function ($q, $route, SuperManagerService) {
            var params = {gid: $route.current.params.gymid};
            return SuperManagerService.gymOverview(params)
              .then(function (data) {
                return $q.resolve(data);
              }, function (errMsg) {
                //TODO: $routeChangeError event
                return $q.reject(errMsg);
              });

          }],
          'gymOrderData'   : ['$q', '$route', 'SuperManagerService', function ($q, $route, SuperManagerService) {
            var params = {gid: $route.current.params.gymid, row: 10};
            return SuperManagerService.gymOrder(params)
              .then(function (data) {
                return $q.resolve(data);
              }, function (errMsg) {
                //TODO: $routeChangeError event
                return $q.reject(errMsg);
              });

          }],
          'gymWithdrawData'   : ['$q', '$route', 'SuperManagerService', function ($q, $route, SuperManagerService) {
            var params = {gid: $route.current.params.gymid, row: 10};
            return SuperManagerService.gymWithdrawList(params)
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
  .controller('SmgymoverviewCtrl', function ($log, $window, $scope, $location, $route, Session, Alerts, gymOverviewData, gymOrderData, gymWithdrawData, SuperManagerService) {
    $log.debug('Injected Oerview Data: ', gymOverviewData);
    //场馆信息
    $scope.gymData = gymOverviewData.gym;
    //场馆类型
    $scope.gymType = gymOverviewData.type;
    //店长信息
    $scope.superManagerData = gymOverviewData.superManager || [];
    //收银员信息
    $scope.cashierData = gymOverviewData.cashier || [];
    //账户信息
    $scope.accountData = gymOverviewData.account || [];

    $log.debug('Injected Gym Withdraw Data: ', gymWithdrawData);
    //提现记录
    $scope.gymWithdrawData = gymWithdrawData || [];

    $log.debug('Injected Order Data: ', gymOrderData);
    //订单信息
    $scope.orderData = gymOrderData;

    //将场馆id存入Session服务中
    Session.gid = $scope.gymData.id;

    $scope.collapseAddCashierForm = false;
    $scope.showNext = false;
    $scope.cashierExist = false;
    $scope.addCashierParams = {
      uid: null,
      nickName: null,
      sex: null
    };

    $scope.setCurrentCashier = function (currentCashier) {
      $scope.currentCashier = currentCashier;
    };

    //验证欲添加收银员是否存在
    $scope.submitCheckCashier = function () {
      var params = {
        phone: $scope.phone,
        code : $scope.code
      };
      $log.debug('验证收银员请求参数', params);
      SuperManagerService.gymCheckCashier(params)
        .then(function (data) {
          $log.debug('收银员可以添加或绑定', data);
          if (data.uid) {
            $scope.addCashierParams = data;
            $scope.cashierExist = true;
          } else {
            $scope.cashierExist = false;
          }
          $scope.showNext = true;
        }, function (errMsg) {
          //if(data.errCode == 19001) {
          //  $window.alert('该手机号码已绑定场馆');
          //  $log.debug('该手机号码已绑定场馆', data.errMsg);
          //} else {
          $window.alert(errMsg);
          $log.debug(errMsg);
          //}

        });

    };

    //添加收银员
    $scope.submitAddCashier = function () {
      var params = {
        gid     : $scope.gymData.id,
        phone   : $scope.phone,
        code    : $scope.code,
        nickName: $scope.addCashierParams.nickName,
        sex     : $scope.addCashierParams.sex
      };
      $log.debug('添加场馆收银员请求参数', params);
      SuperManagerService.gymAddCashier(params)
        .then(function (data) {
          $log.debug('添加场馆收银员成功', data);
          $window.alert('添加场馆收银员成功');
          //Alerts.showAlert($scope, 'alert-success', '添加场馆收银员成功', true, true, 3);

          $scope.cashierData = data;
          $scope.resetAddCashierForm();
        }, function (errMsg) {
          $log.debug('添加场馆收银员失败', errMsg);
          $window.alert(errMsg);
          //Alerts.showAlert($scope, 'alert-danger', errMsg, true, true, 3);
        });

    };

    //绑定收银员
    $scope.submitBindCashier = function (status) {
      var params = {
        gid     : $scope.gymData.id,
        uid     : $scope.addCashierParams.uid,
        code    : $scope.code
      };
      $log.debug('绑定场馆收银员请求参数', params);
      SuperManagerService.gymBindCashier(params)
        .then(function (data) {
          $log.debug('绑定场馆收银员成功', data);
          $window.alert('绑定场馆收银员成功');
          //Alerts.showAlert($scope, 'alert-success', '绑定场馆收银员成功', true, true, 3);

          $scope.cashierData = data;
          $scope.resetAddCashierForm();
        }, function (errMsg) {
          $log.debug('绑定场馆收银员失败', errMsg);
          $window.alert(errMsg);
          //Alerts.showAlert($scope, 'alert-danger', errMsg, true, true, 3);
        });

    };

    //移除（解绑）收银员
    $scope.submitRemoveCashier = function (id) {
      var params = {uid: id};
      $log.debug('移除场馆收银员请求参数', params);
      SuperManagerService.gymRemoveCashier(params)
        .then(function (data) {
          $log.debug('移除场馆收银员成功', data);
          $window.alert('移除场馆收银员成功');
          //Alerts.showAlert($scope, 'alert-success', '移除场馆收银员成功', true, true, 3);
          $scope.cashierData = data;
        }, function (errMsg) {
          $log.debug('移除场馆收银员失败', errMsg);
          $window.alert(errMsg);
          //Alerts.showAlert($scope, 'alert-danger', errMsg, true, true, 3);
        });

    };

    $scope.resetAddCashierForm = function () {
      $scope.showNext = false;
      $scope.phone = null;
      $scope.code = null;
    };

    //发送短信验证码
    $scope.smsCode = function () {
      if(!isMobile($scope.phone)) {
        $window.alert('请输入正确的手机号码');
        return;
      }
      SuperManagerService.smsCode($scope.phone)
        .then(function (data) {
          $window.alert('已发送短信验证码');
        }, function (errMsg) {
          $window.alert(errMsg);
        });
    };

    //提现
    $scope.withdraw = function () {
      var params = {
        fee: $scope.inputAmount,
        aid: $scope.inputAccount.id,
        gid: $scope.gymData.id
      };
      $log.debug('申请提现请求参数: ', params);
      SuperManagerService.gymWithdraw(params)
        .then(function (data) {
          $log.debug('申请提现成功', data);
          $window.alert('提现申请已提交');
        }, function (errMsg) {
          $log.debug('申请提现失败', errMsg);
          $window.alert(errMsg);
        });
    };

    $scope.toggleAddCashierForm = function () {
      $scope.collapseAddCashierForm = !$scope.collapseAddCashierForm;
    };

    for (var i in $scope.accountData) {
      if ($scope.accountData[i].id == $scope.gymData.aid) {
        $scope.inputAccount = $scope.accountData[i];
        $log.debug($scope.inputAccount);
      }
    }

    $scope.toggleReceiveGymPayTemplateMsg = function (id, status) {
      var params = {
        uid: id,
        receive: status
      };
      $log.debug(params);
      SuperManagerService.gymSetCashierReceiveMsg(params)
        .then(function (data) {
          $log.debug(data);
        }, function (errMsg) {
          $log.debug(errMsg);
        });
    };

    function isMobile(str) {
      var reg = /^0?1[3|4|5|8|6|7][0-9]\d{8}$/;
      return reg.test(str);
    }
  });
