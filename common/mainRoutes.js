var express = require('express');
var path = require('path');
var domain = require('domain');
var logger = require('./logger').logger;
var config = require('./config');


exports.setRoutes = function(app) {

    // 页面
    // 基础功能
    var bwpc_index = require('../routes/bwpc_index');
    app = mapping(app, "/", bwpc_index);

    // 
    // var bwpc_common = require('../routes/bwpc_common');
    // app = mapping(app, "/common", bwpc_common);

    //单点登录
    var bwpc_cas = require('../routes/bwpc_cas');
    app = mapping(app, "/cas", bwpc_cas);

    //基础公共服务
    var service = require('../routes/mainServiceRoute');
    app = mapping(app, "/service", service);

    // 公募基金
    var mutualFunds = require('../routes/bwpc_mutualFunds');
    app = mapping(app, '/mutualfunds', mutualFunds);

    // 高端理财
    var privateBanking = require('../routes/bwpc_privateBanking');
    app = mapping(app, '/privatebanking', privateBanking);

    // 活期
    var currentdeposit = require('../routes/bwpc_currentdeposit');
    app = mapping(app, '/currentdeposit', currentdeposit);

    // 定期
    var timedeposit = require('../routes/bwpc_timedeposit');
    app = mapping(app, '/timedeposit', timedeposit);

    // 保险
    var insurance = require('../routes/bwpc_insurance');
    app = mapping(app, '/insurance', insurance);

    // 新手专享
    var newbiezone = require('../routes/bwpc_newBieZone');
    app = mapping(app, '/newbiezone', newbiezone);

    // 转让专区
    var transferzone = require('../routes/bwpc_transferZone');
    app = mapping(app, '/transferzone', transferzone);

    return app;
}


function mapping(app, url, route) {
    app.use(url, route);
    for (var i = 0; i < config.second_domain.length; i++) {
        app.use(config.second_domain[i] + url, route);
    }
    return app;
}