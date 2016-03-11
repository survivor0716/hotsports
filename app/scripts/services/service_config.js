'use strict';

/**
 * @ngdoc service
 * @name hotsportsApp.ServiceConfig111
 * @description
 * # ServiceConfig
 * Constant in the hotsportsApp.
 */

/**
 * @description Hubo PHP后台接口域名地址 用于筛选高德地图场馆数据
 * @type {string}
 */
var SERVER_BASE_URL_PHP = 'http://app.hotsports.cn/index.php';
/**
 * @description Badcat PHP后台接口域名地址
 * @type {string}
 */
var SERVER_BASE_URL2_PHP = 'http://test.service.hotsports.cn/system/Api';
/**
 * @description JAVA后台接口域名地址
 * @type {string}
 */
var SERVER_BASE_URL_JAVA = 'http://test.appserver.hotsports.cn';

angular.module('hotsportsApp')
  .constant('ServiceConfig', {
    //短信验证码
    smsCode       : SERVER_BASE_URL_JAVA + '/verifycode/send',
    //coach_login:    SERVER_BASE_URL_JAVA + '/login/manager',
    manager_qrcode: SERVER_BASE_URL_JAVA + '/wechat/showqrcode',
    //高德地图晒选场馆 临时接口
    gym_lock     : SERVER_BASE_URL_PHP + '/App/Stadium/lock',
    gym_list_get : SERVER_BASE_URL_PHP + '/App/Stadium/query',
    gym_type1_get: SERVER_BASE_URL_PHP + '/App/Stadium/queryStadiumType1',
    gym_type2_get: SERVER_BASE_URL_PHP + '/App/Stadium/queryStadiumType2',
    gym_type3_get: SERVER_BASE_URL_PHP + '/App/Stadium/queryStadiumType3',
    //热动正式接口
    login          : SERVER_BASE_URL2_PHP + '/Index/login',
    logout         : SERVER_BASE_URL2_PHP + '/Index/logout',
    change_password: SERVER_BASE_URL2_PHP + '/Global/changePass',
    sport_type     : SERVER_BASE_URL2_PHP + '/SportType',

    hs_gym_get            : SERVER_BASE_URL2_PHP + '/HGym',
    hs_gym_post             : SERVER_BASE_URL2_PHP + '/HGym/addGym',
    hs_gym_detail          : SERVER_BASE_URL2_PHP + '/HGym/gymDetail',
    hs_gym_setWithdraw     : SERVER_BASE_URL2_PHP + '/HGym/setWithdrawal',

    hs_gym_checkUser       : SERVER_BASE_URL2_PHP + '/HotSportsManager/checkUser',
    hs_gym_addSuperManager : SERVER_BASE_URL2_PHP + '/HotSportsManager/addSuperManager',
    hs_gym_bindSuperManager: SERVER_BASE_URL2_PHP + '/HotSportsManager/bindSuperManager',
    hs_gym_account_add     : SERVER_BASE_URL2_PHP + '/HotSportsManager/addBankAccount',

    hs_todo_withdraw       : SERVER_BASE_URL2_PHP + '/HTodo/withdrawalList',
    hs_todo_handleWithdraw : SERVER_BASE_URL2_PHP + '/HTodo/handleWithdrawal',
    hs_todo_coach          : SERVER_BASE_URL2_PHP + '/HTodo/coachList',

    sm_gym_list                : SERVER_BASE_URL2_PHP + '/SGym',
    sm_gym_overview            : SERVER_BASE_URL2_PHP + '/SGym/gymDetail',

    sm_gym_order               : SERVER_BASE_URL2_PHP + '/Order',

    sm_gym_checkCashier        : SERVER_BASE_URL2_PHP + '/SuperManager/checkUser',
    sm_gym_addCashier          : SERVER_BASE_URL2_PHP + '/SuperManager/addCashier',
    sm_gym_setCashierReceiveMsg: SERVER_BASE_URL2_PHP + '/SuperManager/setCashierReceiveMsg',
    sm_gym_bindCashier         : SERVER_BASE_URL2_PHP + '/SuperManager/bindCashier',
    sm_gym_removeCashier       : SERVER_BASE_URL2_PHP + '/SuperManager/lockCashier',
    sm_gym_withdraw            : SERVER_BASE_URL2_PHP + '/SuperManager/withdrawals',

    sm_gym_withdrawList        : SERVER_BASE_URL2_PHP + '/Withdrawal/withdrawalList'
  })
  .factory('Alerts', function ($anchorScroll) {
    return {
      showAlert: function (scope, type, content, dismiss, autoclose, delay) {
        scope.alertType = type;
        scope.alertMsg = content;
        scope.alertDismiss = dismiss;
        scope.alertAutoClose = autoclose;
        scope.alertCloseDelay = delay;
        $anchorScroll('alert1');
      }
    };
  });


