'use strict';

/**
 * @ngdoc function
 * @name hotsportsApp.controller:CoachListCtrl
 * @description
 * # CoachListCtrl
 * Controller of the hotsportsApp
 */
angular.module('hotsportsApp')
  .controller('CoachListCtrl', function ($scope, $window) {

    $scope.allCoach = [
      {headImg: 'img', nickName: 'lorem5', name: 'John', age:25, gender:'boy', phone: '13800138000'},
      {headImg: 'img', nickName: 'lorem5', name: 'Jessie', age:30, gender:'girl', phone: '13800138000'},
      {headImg: 'img', nickName: 'lorem5', name: 'Johanna', age:28, gender:'girl', phone: '13800138000'},
      {headImg: 'img', nickName: 'lorem5', name: 'Joy', age:15, gender:'girl', phone: '13800138000'},
      {headImg: 'img', nickName: 'lorem5', name: 'Mary', age:28, gender:'girl', phone: '13800138000'},
      {headImg: 'img', nickName: 'lorem5', name: 'Peter', age:95, gender:'boy', phone: '13800138000'},
      {headImg: 'img', nickName: 'lorem5', name: 'Sebastian', age:50, gender:'boy', phone: '13800138000'},
      {headImg: 'img', nickName: 'lorem5', name: 'Erika', age:27, gender:'girl', phone: '13800138000'},
      {headImg: 'img', nickName: 'lorem5', name: 'Patrick', age:40, gender:'boy', phone: '13800138000'},
      {headImg: 'img', nickName: 'lorem5', name: 'Samantha', age:60, gender:'girl', phone: '13800138000'}
    ];

    $scope.coachDetail = function (coach) {
      var str = '';
      for(var i in coach) {
        str += i + ": " + coach[i] + "\n";
      }
      $window.alert(str);
    };
  });
