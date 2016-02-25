'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:SmgymlistCtrl
 * @description
 * # SmgymlistCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .config(['$routeProvider', 'USER_ROLES', 'RouteAuthResolveProvider', function ($routeProvider, USER_ROLES, RouteAuthResolveProvider) {
    //Note that Angular appends 'Provider' to then end of the provider name
    $routeProvider
      .when('/sm/gym-list', {
        templateUrl : 'views/sm-gym-list.html',
        controller  : 'SmgymlistCtrl',
        controllerAs: 'smGymList',
        resolve     : {
          'auth'       : RouteAuthResolveProvider.auth([USER_ROLES.superManager]),
          'gymListData': ['$q', 'SuperManagerService', function ($q, SuperManagerService) {
            return SuperManagerService.gymList()
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
  .controller('SmgymlistCtrl', function ($scope, gymListData) {
    $scope.setCurrentPath('#/sm/gym-list');
    this.data = gymListData;
  });
