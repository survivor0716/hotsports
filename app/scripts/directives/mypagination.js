'use strict';

/**
 * @ngdoc directive
 * @name hotsportsApp.directive:myPagination
 * @description
 * # myPagination
 */
angular.module('hotsportsApp')
  .directive('myPagination', function () {
    return {
      //template: '<div></div>',
      templateUrl: 'views/pagination.html',
      restrict: 'EA',
      scope: {
        conf : '='
      },
      link: function postLink(scope, element, attrs) {
        //element.text('this is the myPagination directive');
      }
    };
  });
