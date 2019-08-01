var logger = require('./logger').logger;
var config = require('./config');
var promise = require('bluebird');
var utils = require('./utils');

/**
 * [authorizeSession 验证是否登陆]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.authorizeSession = function(req, res) {
    return new promise(function(resolve, reject) {
        if (req.session.CAS) {
            resolve(true);
        } else {
            resolve(false);
        }
    })
};