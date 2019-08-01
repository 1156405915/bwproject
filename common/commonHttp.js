var request = require('request');
var logger = require('./logger').logger;
var commonHttpModel = require('./model/commonHttpModel');
var utils = require('./utils');
var config = require('./config');
var txnCode = require('./txnCode');
var restful = require('./restful');
var rspCode = require('./rspCode');
var timeOut = require('./timeOut');
var promise = require('bluebird');

//提交方法-已promise化
exports.doPost = function(reqMsgStr) {
    var formData = {
        reqMsg: reqMsgStr,
        branCode: config.bran_code
    }
    var headMsg = JSON.parse(utils.des_decrypt(reqMsgStr)).headMsg;
    var restfulURL = headMsg.txnCode;
    var timeOut = headMsg.timeOut;
    var postId = utils.guidGenerator();
    return new promise(function(resolve, reject) {
        logger.info("POST[" + postId + "][" + config.service_restful_url + restfulURL + "] DATA:[" + utils.des_decrypt(formData.reqMsg) + "]");
        request.post(config.service_restful_url + restfulURL, {
            timeout: timeOut
        }, function(err, httpResponse, body) {
            if (!err && httpResponse.statusCode == 200) {
                if (body.indexOf("html") >= 0) {
                    reject(config.connect_error);
                } else if (body.indexOf("{") >= 0) {
                    var obj_body = JSON.parse(body);
                    if (obj_body.headMsg.respCode == rspCode.CHENNEL_NOT_EXIST) {
                        logger.error("渠道不存在");
                        reject("渠道不存在");
                    }
                } else {
                    var decrypt_body = utils.des_decrypt(body);
                    logger.info("RECEIVE[" + postId + "][" + body + "][" + decrypt_body + "] ");
                    resolve(decrypt_body);
                }
            } else {
                logger.info("POST[" + postId + "][" + config.service_restful_url + restfulURL + "] DATA:[" + utils.des_decrypt(formData.reqMsg) + "] RECEIVE[" + postId + "][" + body + "]  ERROR:[" + err + "]");
                reject(err);
            }
        }).form(formData);

    })

}

//不用加密的POST提交方法-已promise化
exports.doPostWithoutDes = function(reqUrl, data) {
    var formData = data || "";
    return new promise(function(resolve, reject) {
        logger.info("POST [" + reqUrl + "] DATA:[" + JSON.stringify(formData) + "]");
        request.post(reqUrl, {
            timeout: config.service_timeout
        }, function(err, httpResponse, body) {
            if (!err && httpResponse.statusCode == 200) {
                if (body.indexOf("html") > 0) {
                    reject(config.connect_error);
                } else {
                    logger.info("RECEIVE [" + body + "] ");
                    resolve(body);
                }

            } else {
                logger.info("POST [" + reqUrl + "] ERROR:[" + err + "]");
                reject(err);
            }
        }).form(formData);

    })
}

//不用加密的GET提交方法-已promise化
exports.doGetWithoutDes = function(reqUrl) {
    return new promise(function(resolve, reject) {
        logger.info("GET [" + reqUrl + "]");
        request.get(reqUrl, {
            timeout: config.service_timeout
        }, function(err, httpResponse, body) {
            if (!err && httpResponse.statusCode == 200) {
                if (body.indexOf("<html") > 0 || body.indexOf("< html") > 0) {
                    reject(config.connect_error);
                } else {
                    logger.info("RECEIVE [" + body + "] ");
                    resolve(body);
                }
            } else {
                logger.info("GET [" + reqUrl + "] ERROR:[" + err + "]");
                reject(err);
            }
        })

    })
}

// 拼装报文
exports.creatReqMsg = function(req, service, body) {
    var clientIP = utils.getClientIP(req);
    var head = new commonHttpModel.headMsgModel();
    head.setTxnCode(restful[service]);
    head.setIp(clientIP);
    var timeout = timeOut[service] || config.service_timeout;
    head.setTimeOut(timeout);
    body.setHead(head);
    var str = JSON.stringify(body);
    // 加密
    var reqMsg = utils.des_encrypt(str);
    return reqMsg;
}