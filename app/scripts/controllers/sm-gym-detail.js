'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:SmgymdetailCtrl
 * @description
 * # SmgymdetailCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .config(['$routeProvider', 'USER_ROLES', 'RouteAuthResolveProvider', function ($routeProvider, USER_ROLES, RouteAuthResolveProvider) {
    //Note that Angular appends 'Provider' to then end of the provider name
    //$routeProvider
      //.when('/sm/gym-detail', {
      //  templateUrl: 'views/sm-gym-detail.html',
      //  controller: 'SmgymdetailCtrl',
      //  controllerAs: 'smGymDetail',
      //  resolve: {
      //    'auth': RouteAuthResolveProvider.auth([USER_ROLES.superManager, USER_ROLES.manager]),
      //    'gymDetailData': ['$q', 'Session', 'SuperManagerService', function ($q, Session, SuperManagerService) {
      //      var params = {gid: Session.gid};
      //      return SuperManagerService.gymOverview(params)
      //        .then(function (data) {
      //          return $q.resolve(data);
      //        }, function (errMsg) {
      //          //TODO: $routeChangeError event
      //          return $q.reject(errMsg);
      //        });
      //
      //    }]
      //  }
      //})
  }])
  .controller('SmgymdetailCtrl', function ($log, $window, $scope, $location, $route, Session, Alerts, SuperManagerService, gymDetailData) {
    $log.debug(gymDetailData);
    this.gymData = gymDetailData.gym;
    this.accountData = gymDetailData.account;
    $scope.gid = Session.gid;
  });
