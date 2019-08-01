var express = require('express');
var events = require('events');
var router = express.Router();
var fs = require('../common/fs');
var promise = require('bluebird');
var config = require('../common/config');
var utils = require('../common/utils');
var ssh = require('../common/ssh');
var logger = require('../common/logger').logger;
var rspCode = require("../common/rspCode");
var captcha = require("../common/captcha");
var basicModel = require('../model/basicModel');
var basicService = require('../service/basicService');
var cache = require('../common/cache');

//保险二级首页
router.get('/', function(req, res, next) {
	var cus_code_tx = "",
        gender = "先生";

    if (req.session.CAS) { //判断是否登录
        if (req.session.CAS.cus_code) {
            cus_code_tx = utils.cuscode_encrypt_des(req.session.CAS.cus_code.toString());
        }

        if (req.session.CAS.cus_idn != null && req.session.CAS.cus_idn != "") {
            gender = utils.getIfGender(req.session.CAS.cus_idn);
        }
    }
    res.render('../views/insurance/index.ejs', {
    	project_url: config.project_url,
    	haslogin: req.session.CAS && req.session.CAS.haslogin,
        cus_name: req.session.CAS && req.session.CAS.cus_name,
        cus_idn: req.session.CAS && req.session.CAS.cus_idn,
        cus_type: req.session.CAS && req.session.CAS.cus_type,
        brancode: req.session.CAS && req.session.CAS.brancode,
        qualified_investor: req.session.CAS && req.session.CAS.qualified_investor,
        cus_mphone: req.session.CAS && req.session.CAS.cus_mphone,
        cus_code: req.session.CAS && req.session.CAS.cus_code,
        gender: gender,
        cus_code_des: cus_code_tx
    });
})


module.exports = router;