'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:GymdetailCtrl
 * @description
 * # GymdetailCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('GymdetailCtrl', function ($log, $window, $scope, GymService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.detail = '';

    GymService.getGymDetail()
      .then(function (data) {
        $log.debug(data[0]);
        $scope.detail_data = data[0];
        GymService.showMap($scope.detail_data);
      }, function (errMsg) {
        $scope.errMsg = errMsg;
        $window.alert(errMsg);
      });


  });
