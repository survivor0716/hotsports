/**
 * Created by pc-8 on 15/7/22.
 */
'use strict';
var app = angular.module("womaiCardApp", [
    "ngRoute",
    "myApp.service",
    "myApp.controllers",
    "myApp.directives",
    "myApp.filters"
], function ($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
});

app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
});

app.constant('WX_COUPON_STATUS', {
    All: '',
    NotVerified: 'CARD_STATUS_NOT_VERIFY',
    Failed: 'CARD_STATUS_VERIFY_FAIL',
    Verified: 'CARD_STATUS_VERIFY_OK',
    Deleted: 'CARD_STATUS_DELETE',
    Dispatched: 'CARD_STATUS_DISPATCH'
});

app.constant('API', {
    //URL: 'http://m.womai.com/html5/index.php'
    URL: 'http://coupon.weixin.hotsports.cn'
});

//Routers
app.config(["$routeProvider", "USER_ROLES", function ($routeProvider, USER_ROLES) {
    $routeProvider
        .when("/", {
            controller: "CouponListController",
            templateUrl: "html/coupon-list.html",
            resolve: {
                auth: ["$q", "AuthService", promise],
                initialData: ['newsControllerInitialData', function(newsControllerInitialData){
                    return newsControllerInitialData();
                }]
            }
        })
        .when("/Error", {
            //controller: "LoginController",
            //controllerAs: "list",
            templateUrl: "404.html"
        })
        .when("/Login", {
            controller: "LoginController",
            //controllerAs: "list",
            templateUrl: "html/login.html"
        })
        .when("/Coupon/List/:status/:page", {
            controller: "CouponListController",
            //controllerAs: "list",
            templateUrl: "html/coupon-list.html",
            resolve: {
                auth: ["$q", "AuthService", promise]
            }
        })
        .when("/Coupon/List/:status", {
            controller: "CouponListController",
            //controllerAs: "list",
            templateUrl: "html/coupon-list.html",
            resolve: {
                auth: ["$q", "AuthService", promise]
            }
        })
        .when("/Coupon/List", {
            controller: "CouponListController",
            //controllerAs: "list",
            templateUrl: "html/coupon-list.html",
            resolve: {
                auth: ["$q", "AuthService", promise]
            }
        })
        .when("/Coupon/Setting", {
            controller: "CouponSettingController",
            controllerAs: "setting",
            templateUrl: "html/coupon-setting.html",
            resolve: {
                auth: ["$q", "AuthService", promise]
            }
        })
        .when("/Card/:card_id/List/:page", {
            controller: "CardListController",
            //controllerAs: "list",
            templateUrl: "html/card-list.html",
            resolve: {
                auth: ["$q", "AuthService", promise]
            }
        })
        .when("/Card/:card_id/List/:queryStatus/:page", {
            controller: "CardListController",
            //controllerAs: "list",
            templateUrl: "html/card-list.html",
            resolve: {
                auth: ["$q", "AuthService", promise]
            }
        })
        .otherwise({
            redirectTo: '/Error'
        });
}]);

var promise = function ($q, AuthService) {
    var isLogined = AuthService.isAuthenticated();

    if (isLogined) {
        return $q.when(isLogined);
    } else {
        return $q.reject({authenticated: false});
    }
};

app.run(function ($rootScope, $location, AUTH_EVENTS, Session) {
    //$rootScope.$on('$routeChangeStart', function (event, next) {
    //    //var authorizedRoles = next.resolve.authorizedRoles;
    //    //console.log(authorizedRoles);
    //    //if (!AuthService.isAuthorized(authorizedRoles)) {
    //    //    event.preventDefault();
    //    //    if (AuthService.isAuthenticated()) {
    //    //        // user is not allowed
    //    //        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
    //    //    } else {
    //    //        // user is not logged in
    //    //        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
    //    //    }
    //    //}
    //
    //    if (!AuthService.isAuthenticated()) {
    //        //event.preventDefault();
    //        // user is not logged in
    //        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
    //    }
    //});

    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
        //$log.info("$routeChangeSuccess broadcast");
        //$log.info(event);
        //$log.info(current);
        //$log.info(previous);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
        //$log.warn("$routeChangeError broadcast");
        //$log.debug(event);
        //$log.debug(current);
        //$log.debug(previous);
        //$log.debug(rejection);
        if (rejection.authenticated === false) {
            $location.path("/Login");
        }
    });

    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
        //console.log(event);
        console.log("User don't log in");
    });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event) {
        //console.log(event);
        console.log("User login success");
        $location.path("/Coupon/List");
    });

    $rootScope.$on(AUTH_EVENTS.loginFailed, function (event) {
        //console.log(event);
        console.log("User login failed");
    });
});

//app.config(function ($httpProvider) {
//    $httpProvider.interceptors.push([
//        '$injector',
//        function ($injector) {
//            return $injector.get('AuthInterceptor');
//        }
//    ]);
//});
//app.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
//    return {
//        responseError: function (response) {
//            $rootScope.$broadcast({
//                401: AUTH_EVENTS.notAuthenticated,
//                403: AUTH_EVENTS.notAuthorized,
//                419: AUTH_EVENTS.sessionTimeout,
//                440: AUTH_EVENTS.sessionTimeout
//            }[response.status], response);
//            return $q.reject(response);
//        }
//    };
//});

//app.filter("couponType", function () {
//    return function (input) {
//        input = input || "";
//        var out = input;
//        switch (input) {
//            case "DISCOUNT":
//                out = "折扣券";
//                break;
//            case "CASH":
//                out = "代金券";
//                break;
//            case "GIFT":
//                out = "礼品券";
//                break;
//            case "GROUPON":
//                out = "团购券";
//                break;
//            case "GENERAL_COUPON":
//                out = "优惠券";
//                break;
//        }
//        return out;
//    }
//});
//
//app.filter("couponStatus", function () {
//    return function (input) {
//        input = input || "";
//        var out = input;
//        switch (input) {
//            case "CARD_STATUS_NOT_VERIFY":
//                out = "审核中";
//                break;
//            case "CARD_STATUS_VERIFY_FAIL":
//                out = "未通过";
//                break;
//            case "CARD_STATUS_VERIFY_OK":
//                out = "已通过";
//                break;
//            case "CARD_STATUS_DELETE":
//                out = "已删除";
//                break;
//            case "CARD_STATUS_DISPATCH":
//                out = "已投放";
//                break;
//        }
//        return out;
//    }
//});
//
//app.filter("couponDateInfo", function ($filter) {
//    return function (input, obj) {
//        input = input || "";
//        var out = "";
//        switch (obj.type) {
//            case "DATE_TYPE_FIX_TERM":
//                if (obj.fixed_begin_term) {
//                    out = obj.fixed_begin_term + "天后生效，有效天数" + obj.fixed_term + "天";
//                } else {
//                    out = "当天生效，有效天数" + obj.fixed_term + "天";
//                }
//                break;
//            case "DATE_TYPE_FIX_TIME_RANGE":
//                var beginDate = $filter("date")(obj.begin_timestamp * 1000, "yyyy-MM-dd");
//                var endDate = $filter("date")(obj.end_timestamp * 1000, "yyyy-MM-dd");
//                out = beginDate + "至" + endDate;
//                break;
//        }
//        return out;
//    }
//});


//app.controller("CardTypeController", function ($scope) {
//    $scope.form_card_type = 0;
//
//    this.setValue = function (setValue) {
//        $scope.form_card_type = setValue;
//        console.log($scope.form_card_type);
//    };
//
//    this.confirmCard = function () {
//        if ($scope.form_card_type) {
//            window.location.href = "#/Card/Setting";
//        } else {
//            alert("请选择卡券类型");
//        }
//    };
//});

//app.directive("addcardModal", function () {
//    return {
//        restrict: "E",
//        templateUrl: "html/add-card-modal.html"
//    };
//});
