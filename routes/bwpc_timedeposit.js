var express = require('express');
var events = require('events');
var router = express.Router();
var fs = require('../common/fs');
var promise = require('bluebird');
var config = require('../common/config');
var utils = require('../common/utils');
var ssh = require('../common/ssh');
var logger = require('../common/logger').logger;
var respCode = require("../common/rspCode");
var captcha = require("../common/captcha");
var basicModel = require('../model/basicModel');
var basicService = require('../service/basicService');
var cache = require('../common/cache');

//定期二级首页
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
    // 总体数据
    var indexData = {};
    // 是否查找缓存
    var setRedis = true;
    // 精选产品
    var choice_atvTags,
        choice_expRate,
        choice_expRateTxt,
        choice_hornTags,
        choice_leftKey,
        choice_leftTxt,
        choice_proName,
        choice_proStatus,
        choice_rightKey,
        choice_rightTxt,
        choice_sortId,
        choice_url;
    // 产品数组
    var choiceProArray = new Array();

    // 接口数组
    var arr_all = new Array();

    cache.checkCache(req, "/timedepositdata")
        .then(function(body) {
            // 判断是否有缓存，有缓存就读缓存数据，没有缓存就调用接口数据
            if (body) {
                // 有缓存
                setRedis = false;
                return new promise(function(resolve, reject) {
                    resolve(body);
                })
            } else {
                // 无缓存，调接口
                var choiceProducts = new basicModel.choiceProModel();
                choiceProducts.setpicType("0025");
                arr_all.push(basicService.choicePro(req, choiceProducts));
                return promise.all(arr_all);
            }
        })
        .then(function(values) {
            if (!setRedis) {
                // 有缓存的数据
                logger.info("有缓存数据哦")
                indexData = JSON.parse(values);
            } else {
                // 无缓存接口数据
                // 精选产品
                values[0] = JSON.parse(values[0]);
                if (values[0].headMsg.respCode == respCode.PC_PLAYBYTURN_SUCCESS) {
                    for (i = 0; i < values[0].rows.length; i++) {
                        choice_atvTags = values[0].rows[i].atvTags; //活动标签
                        choice_expRate = values[0].rows[i].expRate; //收益率
                        choice_expRateTxt = values[0].rows[i].expRateTxt; //收益率文案
                        choice_hornTags = values[0].rows[i].hornTags; //角标
                        choice_leftKey = values[0].rows[i].leftKey; //左值
                        choice_leftTxt = values[0].rows[i].leftTxt; //左文案
                        choice_proName = values[0].rows[i].proName; //产品名称
                        choice_proStatus = values[0].rows[i].proStatus; //产品状态
                        choice_rightKey = values[0].rows[i].rightKey; //右值
                        choice_rightTxt = values[0].rows[i].rightTxt; //右文案
                        choice_sortId = parseInt(values[0].rows[i].sortId) + 1; //排序
                        choice_url = values[0].rows[i].url; //跳转链接
                        //收益率的%添加样式变小
                        choice_expRate = choice_expRate.replace(/%/g, "<span>%</span>");
                        cur = {
                            atvTags: choice_atvTags,
                            expRate: choice_expRate,
                            expRateTxt: choice_expRateTxt,
                            hornTags: choice_hornTags,
                            leftKey: choice_leftKey,
                            leftTxt: choice_leftTxt,
                            proName: choice_proName,
                            proStatus: choice_proStatus,
                            rightKey: choice_rightKey,
                            rightTxt: choice_rightTxt,
                            sortId: choice_sortId,
                            url: choice_url
                        }
                        choiceProArray.push(cur);
                    }
                    // sortId进行冒泡排序
                    choiceProArray = utils.bubbleSort(choiceProArray, "sortId");
                } else {
                    choiceProArray = null;
                }
                indexData.choiceProArray = choiceProArray;
                //存入缓存
                logger.info("***将数据存入缓存***");
                return cache.newCache(req, "/timedepositdata", indexData, config.redis_expire_time);
            }
        })
        .then(function() {
            // 渲染页面
            logger.info("******渲染页面****");
            res.render('../views/timedeposit/index.ejs', {
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
                cus_code_des: cus_code_tx,
                choiceProArray: indexData.choiceProArray
            });
        })
})


module.exports = router;