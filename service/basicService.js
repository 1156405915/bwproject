var express = require('express');
var promise = require('bluebird');
var restful = require('../common/restful');
var logger = require('../common/logger').logger;
var commonHttp = require('../common/commonHttp');
var config = require('../common/config');

// 首页轮播图
exports.indexCircleImg = function(req, indexCircleModel) {
    return new promise(function(resolve, reject) {
        // 生成报文
        var reqMsg = commonHttp.creatReqMsg(req, "circleImg", indexCircleModel);
        // 发送报文
        commonHttp.doPost(reqMsg)
            .then(function(body) {
                resolve(body);
            })
            .catch(function(error) {
                //首页轮播图接口错误
                logger.info("***首页轮播图接口错误***ERR***" + error);
                resolve(config.common_failed);
            });
    })
};


// 页面轮播图、活动模块、投资引导、合作机构和保险产品部位的图片资源获取
exports.indexImg = function(req, indexImgModel) {
    return new promise(function(resolve, reject) {
        // 生成报文
        var reqMsg = commonHttp.creatReqMsg(req, "indexImg", indexImgModel);
        // 发送报文
        commonHttp.doPost(reqMsg)
            .then(function(body) {
                resolve(body);
            })
            .catch(function(error) {
                // 页面轮播图、活动模块、投资引导、合作机构和保险产品部位的图片资源获取
                logger.info("***页面轮播图、活动模块、投资引导、合作机构和保险产品部位的图片资源获取接口错误***ERR***" + error);
                resolve(config.common_failed);
            });
    })
};

// 查询精品产品接口
exports.choicePro = function(req, choiceProModel) {
    return new promise(function(resolve, reject) {
        // 生成报文
        var reqMsg = commonHttp.creatReqMsg(req, "choicePro", choiceProModel);
        // 发送报文
        commonHttp.doPost(reqMsg)
            .then(function(body) {
                resolve(body);
            })
            .catch(function(error) {
                // 查询精品产品接口
                logger.info("***查询精品产品接口***ERR***" + error);
                resolve(config.common_failed);
            });
    })
};
/*我的账户*/
exports.indexMyAccount = function(req, indexMyAccountModel) {
    return new promise(function(resolve, reject) {
        // 生成报文
        var reqMsg = commonHttp.creatReqMsg(req, "MyAccount", indexMyAccountModel);

        // 发送报文
        commonHttp.doPost(reqMsg)
            .then(function(body) {
                resolve(body);
            })
            .catch(function(error) {
                reject(error);
            });
    })
};

// 查询话题宝接口
exports.queryHtbLists = function(req, queryHtbListsModel) {
    return new promise(function(resolve, reject) {
        // 生成报文
        var reqMsg = commonHttp.creatReqMsg(req, "queryHtbLists", queryHtbListsModel);
        // 发送报文
        commonHttp.doPost(reqMsg)
            .then(function(body) {
                resolve(body);
            })
            .catch(function(error) {
                // 查询话题宝接口
                logger.info("***查询话题宝接口***ERR***" + error);
                resolve(config.common_failed);
            });
    })
};

// 查询小额理财接口
exports.queryMicroFinc = function(req, queryMicroFincModel) {
    return new promise(function(resolve, reject) {
        // 生成报文
        var reqMsg = commonHttp.creatReqMsg(req, "queryMicroFinc", queryMicroFincModel);
        // 发送报文
        commonHttp.doPost(reqMsg)
            .then(function(body) {
                resolve(body);
            })
            .catch(function(error) {
                // 查询小额理财接口
                logger.info("***查询小额理财接口***ERR***" + error);
                resolve(config.common_failed);
            });
    })
};

// 查询快投产品接口
exports.queryHqbLists = function(req, queryHqbListsModel) {
    return new promise(function(resolve, reject) {
        // 生成报文
        var reqMsg = commonHttp.creatReqMsg(req, "queryHqbLists", queryHqbListsModel);
        // 发送报文
        commonHttp.doPost(reqMsg)
            .then(function(body) {
                resolve(body);
            })
            .catch(function(error) {
                // 查询快投产品接口
                logger.info("***查询快投产品接口***ERR***" + error);
                resolve(config.common_failed);
            });
    })
};

// 固定收益接口
exports.queryARLists = function(req, queryARListsModel) {
    return new promise(function(resolve, reject) {
        // 生成报文
        var reqMsg = commonHttp.creatReqMsg(req, "queryARLists", queryARListsModel);
        // 发送报文
        commonHttp.doPost(reqMsg)
            .then(function(body) {
                resolve(body);
            })
            .catch(function(error) {
                // 固定收益接口
                logger.info("***固定收益接口***ERR***" + error);
                resolve(config.common_failed);
            });
    })
};

// 月月开花接口
exports.queryInnoLists = function(req, queryInnoListsModel) {
    return new promise(function(resolve, reject) {
        // 生成报文
        var reqMsg = commonHttp.creatReqMsg(req, "queryInnoLists", queryInnoListsModel);
        // 发送报文
        commonHttp.doPost(reqMsg)
            .then(function(body) {
                resolve(body);
            })
            .catch(function(error) {
                // 月月开花接口
                logger.info("***月月开花接口***ERR***" + error);
                resolve(config.common_failed);
            });
    })
};

// 公募基金接口
exports.qryFund = function(req, qryFundModel) {
    return new promise(function(resolve, reject) {
        // 生成报文
        var reqMsg = commonHttp.creatReqMsg(req, "qryFund", qryFundModel);
        // 发送报文
        commonHttp.doPost(reqMsg)
            .then(function(body) {
                resolve(body);
            })
            .catch(function(error) {
                // 公募基金接口
                logger.info("***公募基金接口***ERR***" + error);
                resolve(config.common_failed);
            });
    })
};