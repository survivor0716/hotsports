'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.GymService
 * @description
 * # GymService
 * Service in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .service('GymService', function ($log, $http, $q, ServiceConfig) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    function TypeList(arr) {
      this.listArray = arr || [];
    }
    TypeList.prototype.getList = function () {
      if (this.listArray.length) {
        return this.listArray;
      } else {
        return [{name: '无'}];
      }
    };
    this.typeList1 = new TypeList();
    this.typeList2 = new TypeList();
    this.typeList3 = new TypeList();

    function Type() {
      this.id = null;
      this.name = null;
    }
    Type.prototype.init = function (obj) {
      this.id = obj.id;
      this.name = obj.name;
    };
    Type.prototype.empty = function () {
      this.id = null;
      this.name = null;
    };
    this.type1 = new Type();
    this.type2 = new Type();
    this.type3 = new Type();

    /**
     * @description 获取场馆列表
     * @param params
     * @returns {*}
     */
    this.getGymList = function (params) {
      return $http.post(ServiceConfig.gym_list_get, params)
        .then(function (response) {
          if (typeof response.data === 'object') {
            if (response.data.result) {
              return $q.resolve(response.data);
            } else {
              return $q.reject(response.data.errMsg);
            }
          } else {
            return $q.reject(response.data);
          }
        }, function (response) {
          return $q.reject(response.data);
        });
    };

    var self = this;
    this.getTypeList1 = function () {
      if (this.typeList1.listArray.length) {
        return $q.when(this.typeList1.listArray);
      } else {
        return $http.post(ServiceConfig.gym_type1_get)
          .then(function (response) {
            if (typeof response.data === 'object') {
              if (response.data.result) {
                $log.debug('Get type list 1 remotely first time. ', response.data);
                self.typeList1.listArray = response.data.data;
                return $q.resolve(response.data.data);
              } else {
                return $q.reject(response.data.errMsg);
              }
            } else {
              return $q.reject(response.data);
            }
          }, function (response) {
            return $q.reject(response.data);
          });
      }
    };

    this.getTypeList2 = function (id) {
      return $http.post(ServiceConfig.gym_type2_get, {type1: id})
        .then(function (response) {
          if (typeof response.data === 'object') {
            if (response.data.result) {
              self.typeList2.listArray = response.data.data;
              return $q.resolve(response.data.data);
            } else {
              return $q.reject(response.data.errMsg);
            }
          } else {
            return $q.reject(response.data);
          }
        }, function (response) {
          return $q.reject(response.data);
        });
    };

    this.getTypeList3 = function (id) {
      return $http.post(ServiceConfig.gym_type3_get, {type2: id})
        .then(function (response) {
          if (typeof response.data === 'object') {
            if (response.data.result) {
              self.typeList3.listArray = response.data.data;
              return $q.resolve(response.data.data);
            } else {
              return $q.reject(response.data.errMsg);
            }
          } else {
            return $q.reject(response.data);
          }
        }, function (response) {
          return $q.reject(response.data);
        });
    };

    this.lockGym = function (id) {
      return $http.post(ServiceConfig.gym_lock, {id: id})
        .then(function (response) {
          if (typeof response.data === 'object') {
            if (response.data.result) {
              return $q.resolve(response.data.data);
            } else {
              return $q.reject(response.data.errMsg);
            }
          } else {
            return $q.reject(response.data);
          }
        }, function (response) {
          return $q.reject(response.data);
        });
    };

    this.setCurrentGym = function (obj) {
      this.currentGym = obj;
    };

    this.getCurrentGym = function () {
      return this.currentGym;
    };

    this.getGymDetail = function () {
      return $http.post(ServiceConfig.gym_detail, {}, {'withCredentials': true})
        .then(function (response) {
          if (typeof response.data === 'object') {
            if (response.data.result) {
              return $q.resolve(response.data.data);
            } else {
              return $q.reject(response.data.errMsg);
            }
          } else {
            return $q.reject(response.data);
          }
        }, function (response) {
          return $q.reject(response.data);
        });
    };

    this.getGymOrder = function () {
      return $http.post(ServiceConfig.gym_order, {}, {'withCredentials': true})
        .then(function (response) {
          if (typeof response.data === 'object') {
            if (response.data.result) {
              return $q.resolve(response.data.data);
            } else {
              return $q.reject(response.data.errMsg);
            }
          } else {
            return $q.reject(response.data);
          }
        }, function (response) {
          return $q.reject(response.data);
        });
    };

    this.showMap = function (detail) {
      var lng = detail.lng;
      var lat = detail.lat;

      var map, marker;
      map = new AMap.Map("mapContainer", {
        resizeEnable: true,
        center: [lng, lat],
        zoom: 13
      });

      marker = new AMap.Marker({
        icon: "http://webapi.amap.com/images/marker_sprite.png",
        position: [lng, lat]
      });
      marker.setMap(map);

      function openInfo() {
        //构建信息窗体中显示的内容
        var infoWindow;
        var info = [];
        //info.push("<div><div><img style=\"float:left;\" src=\" http://webapi.amap.com/images/autonavi.png \"/></div> ");
        info.push("<div style=\"padding:4px;\"><b>" + detail.name + "</b>");
        info.push("电话 : " + detail.tel + " 邮编 : " + detail.pcode);
        info.push("地址 : " + detail.province + detail.city + detail.district + detail.addressDetail + "</div>");

        infoWindow = new AMap.InfoWindow({
          content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        });
        infoWindow.open(map, [lng, lat]);
      }

      openInfo();

      AMap.event.addListener(marker, 'click', function () {
        openInfo();
      });
    };
  });
