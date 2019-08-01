var redis = require('./redis');
var config = require('./config');
var promise = require('bluebird');
var logger = require('./logger').logger;

/**
 * [checkCache 校验Cache]
 * @param  {[req]} req     [description]
 * @param  {[string]} RESTful [description]
 * @return {[promise]}         [description]
 */
exports.checkCache = function(req, RESTful) {
    return new promise(function(resolve, reject) {
        var key = config.project_url + "_" + RESTful;
        logger.info("**********缓存数据******" + key + "*********")
        redis.get(key)
            .then(function(body) {
                var obj_body = JSON.parse(body);
                resolve(obj_body);
            })
            .catch(function(err) {
                reject(err);
            })
    })
}

/**
 * [newCache description]
 * @param  {[req]} req     [description]
 * @param  {[String]} RESTful [description]
 * @param  {[Object]} data    [description]
 * @param  {[Number]} expire  [description]
 * @return {[type]}         [description]
 */
exports.newCache = function(req, RESTful, data, expire) {
    return new promise(function(resolve, reject) {
        var key = config.project_url + "_" + RESTful;
        logger.info("***缓存key=" + key + "***")
        var str_obj = JSON.stringify(data);
        redis.mset(key, str_obj)
            .then(function(body) {
                return redis.expire(key, expire);
            })
            .then(function(success) {
                resolve(true);
            })
            .catch(function(err) {
                reject(err);
            })
    })
}