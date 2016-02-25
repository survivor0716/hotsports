'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:GymInfoCtrl
 * @description
 * # GymInfoCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('GymInfoCtrl', function ($log, $window, $scope, GymService) {
    $scope.gymDetails = GymService.getCurrentGym();

    //var str = '';
    //for (var i in $scope.gymDetails) {
    //  str += i + ": " + $scope.gymDetails[i] + '\n';
    //}
    //$scope.info = str;

    GymService.showMap($scope.gymDetails);

    //var lng = $scope.gymDetails.lng;
    //var lat = $scope.gymDetails.lat;
    //
    //var map, marker;
    //map = new AMap.Map("mapContainer", {
    //  resizeEnable: true,
    //  center: [lng, lat],
    //  zoom: 13
    //});
    //
    //marker = new AMap.Marker({
    //  icon: "http://webapi.amap.com/images/marker_sprite.png",
    //  position: [lng, lat]
    //});
    //marker.setMap(map);
    //
    //function openInfo() {
    //  //构建信息窗体中显示的内容
    //  var infoWindow;
    //  var info = [];
    //  //info.push("<div><div><img style=\"float:left;\" src=\" http://webapi.amap.com/images/autonavi.png \"/></div> ");
    //  info.push("<div style=\"padding:4px;\"><b>" + $scope.gymDetails.name + "</b>");
    //  info.push("电话 : " + $scope.gymDetails.tel + " 邮编 : " + $scope.gymDetails.pcode);
    //  info.push("地址 : " + $scope.gymDetails.province + $scope.gymDetails.city + $scope.gymDetails.district + $scope.gymDetails.addressDetail + "</div>");
    //
    //  infoWindow = new AMap.InfoWindow({
    //    content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
    //  });
    //  infoWindow.open(map, [lng, lat]);
    //}
    //
    //openInfo();
    //
    //AMap.event.addListener(marker, 'click', function () {
    //  openInfo();
    //});

  });
