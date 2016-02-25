'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:ManagerQrcodeCtrl
 * @description
 * # ManagerQrcodeCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('ManagerQrcodeCtrl', function ($log, $scope, $window, $document, ServiceConfig, Session) {
    $scope.setCurrentPath('#/manager/qrcode');

    $scope.qrcode_src = ServiceConfig.manager_qrcode + '?uid=' + Session.userId;
    //$scope.qrcode_src = '';

    (function (doc, win) {
      var docEl = doc.documentElement;
          //resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
          (function () {
            var clientWidth = docEl.clientWidth >= 768 ? 768 : docEl.clientWidth;
            /*console.log(docEl.clientWidth);
             console.log(docEl.clientWidth >= 768);*/
            if (!clientWidth) {return;}
            docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
          })();

      //if (!doc.addEventListener) return;
      //win.addEventListener(resizeEvt, recalc, false);
      //doc.addEventListener('DOMContentLoaded', recalc, false);
    })($window.document, $window);
  });
