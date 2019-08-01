var express = require('express');
var router = express.Router();
var url = require('url');
var utils = require('../common/utils');
var config = require('../common/config');
var basicModel = require('../model/basicModel');
var basicService = require('../service/basicService');
var logger = require('../common/logger').logger;
var cas = require('../common/cas').CAS();
var nodeFetch = require('node-fetch');
var commonHttp = require('../common/commonHttp');
var cache = require('../common/cache');
var rspCode = require("../common/rspCode");
var promise = require('bluebird');

var rspCode = require("../common/rspCode");
var promise = require('bluebird');
/* GET home page. */
// 首页
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


    /*总体数据*/
    var indexData = {};
    /*公告3条*/
    var announcement;
    //是否查找缓存
    var setRedis = true;
    var CircleImg = new Array(); //0001首页轮播
    var ThreeActivityImg = new Array(); //0002首页三位一体
    var CooperationImg = new Array(); //0003合作机构
    var FourActivityImg = new Array(); //0015首页四位一体
    var MoneyImg = new Array(); //0100 – 理财险图片
    var HealthImg = new Array(); //0101 – 健康险图片
    var PersonImg = new Array(); //0102 – 人寿险图片
    var AccidentImg = new Array(); //0103 – 意外险图片
    var LogoImg = new Array(); //0120 – 保险LOGO
    var AdvertisementImg = new Array(); //0121 – 保险广告图
    //首页图片
    var img_link, img_note, img_pic_path, img_sortNo, cur;
    var totalImg = {};

    //精选产品
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
    var choiceProArray = new Array();

    //接口数组
    var arr_all = new Array();




    cache.checkCache(req, "/indexdata").then(function(body) {
            if (body) {
                //有缓存
                setRedis = false;
                return new promise(function(resolve, reject) {
                    resolve(body);
                });
            } else {
                //无缓存,调取接口
                //cms新闻资讯
                arr_all.push(commonHttp.doGetWithoutDes("https://www.bundwealth.com/cms/plus/list.php?tid=17"));
                //轮播图列表接口
                var indexImgModel = new basicModel.indexImgModel();
                arr_all.push(basicService.indexImg(req, indexImgModel));
                //精选产品接口
                var choiceProModel = new basicModel.choiceProModel();
                arr_all.push(basicService.choicePro(req, choiceProModel));

                return promise.all(arr_all);
            }
        })
        .then(function(values) {
            if (!setRedis) {
                logger.info("***有缓存,缓存数据为***");

                //有缓存
                indexData = JSON.parse(values);
            } else {
                //无缓存
                //cms新闻资讯
                values[0] = values[0].replace(/<.*?>/ig, "");
                announcement = JSON.parse(values[0].replace(",]", "]")).announcement;

                //首页图片
                console.info("*****************")
                console.info(values[1]);
                values[1] = JSON.parse(values[1]);
                if (values[1].headMsg.respCode == rspCode.PC_PLAYBYTURN_SUCCESS) {
                    for (var i = 0; i < values[1].rows.length; i++) {
                        img_link = values[1].rows[i].link;
                        img_note = values[1].rows[i].note;
                        img_pic_path = values[1].rows[i].picPath;
                        img_sortNo = values[1].rows[i].sortNo;
                        img_remark = values[1].rows[i].remark || null;
                        cur = {
                            sortNo: img_sortNo,
                            link: img_link,
                            note: img_note,
                            pic_path: config.img_path_online + img_pic_path,
                            remark: img_remark
                        }
                        switch (values[1].rows[i].picTy) {
                            case config.circleImg_picTy: //首页轮播
                                CircleImg.push(cur);
                                break;
                            case config.threeActivityImg_picTy: //首页三位一体
                                ThreeActivityImg.push(cur);
                                break;
                            case config.cooperationImg_picTy: //合作机构
                                CooperationImg.push(cur);
                                break;
                            case config.fourActivityImg_picTy: //首页四位一体
                                FourActivityImg.push(cur);
                                break;
                            case config.moneyImg_picTy: //理财险图片
                                MoneyImg.push(cur);
                                break;
                            case config.healthImg_picTy: //健康险图片
                                HealthImg.push(cur);
                                break;
                            case config.personImg_picTy: //人寿险图片
                                PersonImg.push(cur);
                                break;
                            case config.accidentImg_picTy: //意外险图片
                                AccidentImg.push(cur);
                                break;
                            case config.logoImg_picTy: //保险LOGO
                                LogoImg.push(cur);;
                                break;
                            case config.advertisementImg_picTy: //保险广告图
                                AdvertisementImg.push(cur);
                                break;
                            default:
                                break;
                        }

                    }
                } else {
                    CircleImg = null;
                    ThreeActivityImg = null;
                    CooperationImg = null;
                    FourActivityImg = null;
                    MoneyImg = null;
                    HealthImg = null;
                    PersonImg = null;
                    AccidentImg = null;
                    LogoImg = null;
                    AdvertisementImg = null;
                    throw body.headMsg;
                }
                totalImg.CircleImg = CircleImg;
                totalImg.ThreeActivityImg = ThreeActivityImg;
                totalImg.CooperationImg = CooperationImg;
                totalImg.FourActivityImg = FourActivityImg;
                totalImg.MoneyImg = MoneyImg;
                totalImg.HealthImg = HealthImg;
                totalImg.PersonImg = PersonImg;
                totalImg.AccidentImg = AccidentImg;
                totalImg.LogoImg = LogoImg;
                totalImg.AdvertisementImg = AdvertisementImg;

                //排序
                CircleImg = utils.bubbleSort(CircleImg, "sortNo");
                ThreeActivityImg = utils.bubbleSort(ThreeActivityImg, "sortNo");
                CooperationImg = utils.bubbleSort(CooperationImg, "sortNo");
                FourActivityImg = utils.bubbleSort(FourActivityImg, "sortNo");
                MoneyImg = utils.bubbleSort(MoneyImg, "sortNo");
                HealthImg = utils.bubbleSort(HealthImg, "sortNo");
                PersonImg = utils.bubbleSort(PersonImg, "sortNo");
                AccidentImg = utils.bubbleSort(AccidentImg, "sortNo");
                LogoImg = utils.bubbleSort(LogoImg, "sortNo");
                AdvertisementImg = utils.bubbleSort(AdvertisementImg, "sortNo");

                totalImg.CircleImg = CircleImg;
                totalImg.ThreeActivityImg = ThreeActivityImg;
                totalImg.CooperationImg = CooperationImg;
                totalImg.FourActivityImg = FourActivityImg;
                totalImg.MoneyImg = MoneyImg;
                totalImg.HealthImg = HealthImg;
                totalImg.PersonImg = PersonImg;
                totalImg.AccidentImg = AccidentImg;
                totalImg.LogoImg = LogoImg;
                totalImg.AdvertisementImg = AdvertisementImg;

                //精选产品
                values[2] = JSON.parse(values[2]);
                if (values[2].headMsg.respCode == rspCode.PC_PLAYBYTURN_SUCCESS) {
                    for (i = 0; i < values[2].rows.length; i++) {
                        choice_atvTags = values[2].rows[i].atvTags; //活动标签
                        choice_expRate = values[2].rows[i].expRate; //收益率
                        choice_expRateTxt = values[2].rows[i].expRateTxt; //收益率文案
                        choice_hornTags = values[2].rows[i].hornTags; //角标
                        choice_leftKey = values[2].rows[i].leftKey; //左值
                        choice_leftTxt = values[2].rows[i].leftTxt; //左文案
                        choice_proName = values[2].rows[i].proName; //产品名称
                        choice_proStatus = values[2].rows[i].proStatus; //产品状态
                        choice_rightKey = values[2].rows[i].rightKey; //右值
                        choice_rightTxt = values[2].rows[i].rightTxt; //右文案
                        choice_sortId = values[2].rows[i].sortId; //排序
                        choice_url = values[2].rows[i].url; //跳转链接

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
                    choiceProArray = utils.bubbleSort(choiceProArray, "sortId");
                } else {
                    choiceProArray = null;
                }


                /*公告3条*/
                indexData.announcement = announcement;
                /*首页图片*/
                indexData.totalImg = totalImg;
                /*精选产品*/
                indexData.choiceProArray = choiceProArray;

                //存入缓存
                logger.info("***将首页数据存入缓存***");
                return cache.newCache(req, "/indexdata", indexData, config.redis_expire_time);
            }
        })
        .then(function() {
            logger.info("***渲染首页页面***");

            res.render('bwpc/BW_PC_index', {
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
                announcement: indexData.announcement,
                totalImg: indexData.totalImg,
                choiceProArray: indexData.choiceProArray


            });
        })
});



/* GET home page. */
// 首页
router.get('/login', function(req, res, next) {
    req.session.islogin = true;
    res.render('bwpc/BW_PC_index', {
        project_url: config.project_url,
        haslogin: req.session.CAS && req.session.CAS.haslogin,
        cus_name: req.session.CAS && req.session.CAS.cus_name,
        cus_idn: req.session.CAS && req.session.CAS.cus_idn,
        cus_type: req.session.CAS && req.session.CAS.cus_type,
        brancode: req.session.CAS && req.session.CAS.brancode,
        qualified_investor: req.session.CAS && req.session.CAS.qualified_investor,
        cus_mphone: req.session.CAS && req.session.CAS.cus_mphone,
        cus_code: req.session.CAS && req.session.CAS.cus_code


    });
});

module.exports = router;