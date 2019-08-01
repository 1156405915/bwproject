var express = require('express');
var router = express.Router();
var url = require('url');
var utils = require('../common/utils');
var config = require('../common/config');
var commonHttp = require('../common/commonHttp');
var logger = require('../common/logger').logger;
var cas = require('../common/cas').CAS();
var nodeFetch = require('node-fetch');
var promise = require('bluebird');
var http = require('http');
var stripPrefix = require('xml2js/lib/processors').stripPrefix;
var xml2js = require('xml2js').parseString;

/* GET home page. */
// 首页
router.get('/logout', function(req, res, next) {

    logger.info("***in CAS logout");
    cas.logout(req, res);
});

// 登陆
router.get('/login', function(req, res, next) {
    logger.info("***in CAS login");
    cas.login(req, res, next);
});

//验证
router.get("/validate", function(req, res, next) {
    //登录后
    // console.info("!!!!!!!!!!!")
    // var expires = new Date();
    // expires.setDate(expires.getDate() + 90);
    // commonHttp.doGetWithoutDes("https://www.bundtrade.cn/BundTrade/assetIndex!bundAsset.action?muid=x")
    //     .then(function(body) {
    //         console.info("doGetWithoutDes");
    //         console.info(body);
    //         next();
    //     })
    //     .catch(function(error) {
    //         console.info("errordoGetWithoutDes");
    //         console.info(error);
    //         next();
    //     });

    res.redirect(config.project_url);
});


module.exports = router;