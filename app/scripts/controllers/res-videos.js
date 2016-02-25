'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:ResVideosCtrl
 * @description
 * # ResVideosCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('ResVideosCtrl', function ($scope, VideoDetails) {
    $scope.setVideo = function (video) {
      VideoDetails.setVideo(video);
    };
  });
