'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.VideoDetails
 * @description
 * # VideoDetails
 * Factory in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .factory('VideoDetails', function () {
    // Service logic
    // ...

    var currentVideo = null;

    // Public API here
    return {
      setVideo: function (video) {
        currentVideo = video;
      },
      getVideo: function () {
        return currentVideo;
      }
    };
  });
