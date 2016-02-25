'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:ResVideoDetailsCtrl
 * @description
 * # ResVideoDetailsCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('ResVideoDetailsCtrl', function ($scope, VideoDetails) {
    //$scope.video = VideoDetails.getVideo($scope);
    $scope.video = VideoDetails.getVideo();
  });
