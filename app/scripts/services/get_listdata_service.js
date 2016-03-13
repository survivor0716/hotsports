'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.getListDataService
 * @description
 * # getListDataService
 * Service in the hotsportsApp.
 */
angular.module('hotsportsApp')
  .service('getListDataService', function ($http, PromiseCallback) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.pages = [];
    this.post = function (uri, params) {
      return $http.post(uri, params, {'withCredentials': true})
        .then(PromiseCallback.successCallback, PromiseCallback.failureCallback);
    };

    this.createPageLinks = function (currentPage, totalPage) {
      //生成数字链接
      if (currentPage > 1 && currentPage < totalPage) {
        this.pages = [
          currentPage - 1,
          currentPage,
          currentPage + 1
        ];
      } else if (currentPage == 1 && totalPage > 1) {
        this.pages = [
          currentPage,
          currentPage + 1
        ];
      } else if (currentPage == totalPage && totalPage > 1) {
        this.pages = [
          currentPage - 1,
          currentPage
        ];
      } else {
        this.pages = [
          currentPage
        ];
      }
      return this.pages;
    };
  });
