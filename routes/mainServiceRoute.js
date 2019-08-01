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

// 轮播图
router.post('/indexCircleImg', function(req, res, next) {
    //是否查找缓存
    var setRedis = true;
    //轮播图列表
    cache.checkCache(req, "indexCircleImg")
        .then(function(body) {
            if (utils.isEmpty(body)) {
                //Redis中不存在
                logger.info("***调用后台indexCircleImg接口***");
                var indexCircleModel = new basicModel.indexCircleModel();
                return basicService.indexCircleImg(req, indexCircleModel)
            } else {
                return new promise(function(resolve, reject) {
                    logger.info("***从redis中获取indexCircleImg接口数据***");
                    setRedis = false;
                    resolve(body);
                })
            }
        })
        .then(function(body) {
            body = JSON.parse(body)
            if (setRedis) {
                logger.info("***将indexCircleImg接口数据缓存入redis***");
                //储存redis
                cache.newCache(req, "indexCircleImg", body, config.redis_expire_time);
            }
            var totalImg = null;
            if (body.headMsg.respCode == rspCode.PC_PLAYBYTURN_SUCCESS) {
                totalImg = new Array();
                for (var i = 0; i < body.rows.length; i++) {
                    var link = body.rows[i].link;
                    var note = body.rows[i].note;
                    var pic_path = body.rows[i].picPath;
                    var cur = {
                        id: 'slide' + i,
                        link: link,
                        note: note,
                        pic_path: config.img_path_online + pic_path
                    }
                    totalImg.push(cur);
                }
            } else {
                totalImg = null;
                throw body.headMsg;
            }
            return totalImg;
        })
        .then(function(totalImg) {
            res.end(JSON.stringify(totalImg));
        })
        .catch(function(err) {
            logger.info("***调用indexCircleImg接口错误***");
            //通讯错误   
            if (!err || err.toString().indexOf("ECONNREFUSED") > 0 || err.toString().indexOf("ETIMEDOUT") > 0) {
                res.end(config.connect_error);
            } else {
                res.end(config.common_failed);
            }
        })
})




// 轮播图
router.post('/indexImg', function(req, res, next) {
    //是否查找缓存
    var setRedis = true;
    //轮播图列表
    cache.checkCache(req, "indexImg")
        .then(function(body) {
            if (utils.isEmpty(body)) {
                //Redis中不存在
                logger.info("***调用后台indexImg接口***");
                var indexImgModel = new basicModel.indexImgModel();
                return basicService.indexImg(req, indexImgModel)
            } else {
                return new promise(function(resolve, reject) {
                    logger.info("***从redis中获取indexImg接口数据***");
                    setRedis = false;
                    resolve(body);
                })
            }
        })
        .then(function(body) {
            body = JSON.parse(body)
            if (setRedis) {
                logger.info("***将indexImg接口数据缓存入redis***");
                //储存redis
                cache.newCache(req, "indexImg", body, config.redis_expire_time);
            }
            var CircleImg = new Array(); //0001首页轮播
            var ThreeActivityImg = new Array(); //0002首页三位一体
            var CooperationImg = new Array(); //0003合作机构
            var FourActivityImg = new Array(); //0015首页四位一体
            var link, note, pic_path, sortNo, cur;
            var totalImg = {};
            if (body.headMsg.respCode == rspCode.PC_PLAYBYTURN_SUCCESS) {
                console.info("***body=***" + body);
                for (var i = 0; i < body.rows.length; i++) {
                    link = body.rows[i].link;
                    note = body.rows[i].note;
                    pic_path = body.rows[i].picPath;
                    sortNo = body.rows[i].sortNo;
                    cur = {
                        sortNo: sortNo,
                        link: link,
                        note: note,
                        pic_path: config.img_path_online + pic_path
                    }
                    if (body.rows[i].picTy == "0001") {
                        //0001首页轮播
                        CircleImg.push(cur);
                    } else if (body.rows[i].picTy == "0002") {
                        //0002首页三位一体
                        ThreeActivityImg.push(cur);
                    } else if (body.rows[i].picTy == "0003") {
                        //0003合作机构
                        CooperationImg.push(cur);
                    } else if (body.rows[i].picTy == "0015") {
                        //0015首页四位一体
                        FourActivityImg.push(cur);
                    }
                }
            } else {
                CircleImg = null;
                ThreeActivityImg = null;
                CooperationImg = null;
                FourActivityImg = null;
                throw body.headMsg;
            }
            //排序
            // console.info(CooperationImg);
            CircleImg = utils.bubbleSortForIndexImg(CircleImg);
            ThreeActivityImg = utils.bubbleSortForIndexImg(ThreeActivityImg);
            CooperationImg = utils.bubbleSortForIndexImg(CooperationImg);
            FourActivityImg = utils.bubbleSortForIndexImg(FourActivityImg);
            // console.info("******************************")
            // console.info(CooperationImg);
            totalImg.CircleImg = CircleImg;
            totalImg.ThreeActivityImg = ThreeActivityImg;
            totalImg.CooperationImg = CooperationImg;
            totalImg.FourActivityImg = FourActivityImg;
            return totalImg;
        })
        .then(function(totalImg) {
            res.end(JSON.stringify(totalImg));
        })
        .catch(function(err) {
            logger.info("***调用indexImg接口错误***");
            //通讯错误   
            if (!err || err.toString().indexOf("ECONNREFUSED") > 0 || err.toString().indexOf("ETIMEDOUT") > 0) {
                res.end(config.connect_error);
            } else {
                res.end(config.common_failed);
            }
        })
})


//用户信息
router.post('/getUserInfo', function(req, res, next) {
     //用户信息
    var body=req.body;    
    var getUserInformation = new basicModel.getCusInformationModel();
    var userInformationObj="";
    getUserInformation.setCusCode(body.cusCode);
     basicService.indexMyAccount(req, getUserInformation)
        .then(function(body) {
            userInformationObj = JSON.parse(body);
            if (userInformationObj.respCode != rspCode.PC_PLAYBYTURN_SUCCESS) { return false; }
           res.end(JSON.stringify(userInformationObj));
        }).catch(function(err) {
            logger.info("***getUserInfo调用接口错误***");
            //通讯错误   
            if (!err || err.toString().indexOf("ECONNREFUSED") > 0 || err.toString().indexOf("ETIMEDOUT") > 0) {
                res.end(config.connect_error);
            } else {
                res.end(config.common_failed);
            }
        })
})



module.exports = router;