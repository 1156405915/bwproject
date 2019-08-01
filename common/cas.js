var xml2js = require('xml2js').parseString;
var logger = require('./logger').logger;
var config = require('./config');
var stripPrefix = require('xml2js/lib/processors').stripPrefix;
var nodeFetch = require('node-fetch');
var commonHttp = require('../common/commonHttp');
var utils = require('../common/utils');

var cas_host;
var service;
var CAS = function() {
    cas_host = config.CAS_host;
    service = config.CAS_service;
    return CAS;
};



CAS.validate = function(req, res, next, service) {
    logger.info("***CAS validate");
    // var lasturl = req.headers.referer || req.host;
    if (req.user) {
        next();
    } else {
        checkCas(req, res, next);
    }
}

/**
 * [auth CAS验证]
 * @type {[type]}
 */
CAS.auth = (function() {

    var _ref = function(req, res, next) {
        CAS.validate(req, res, next)
    }
    return function(req, res, next) {
        return _ref.apply(this, arguments);
    };

})();

/**
 * [logout CAS登出]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
CAS.logout = function(req, res) {
    var lasturl = req.headers.referer || req.host;
    req.session.CAS = null;
    // res.clearCookie(config.cas_ticket, {
    //     path: '/'
    // });
    res.redirect(config.CAS_logout + "?service=" + config.project_url);
}

CAS.login = function(req, res, next) {
    var lasturl = req.headers.referer || req.host;
    logger.info("***CAS login");
    checkCas(req, res, next);
}

//验证cas
var checkCas = function(req, res, next) {

    var _this = this;
    var cas_host = config.CAS_host;
    var service = config.CAS_service;
    var ticket = req.query.ticket;
    console.info("ticket===" + ticket);
    if (ticket) {
        var dest = cas_host + '/serviceValidate?service=' + service + '&ticket=' + ticket;
        logger.info("***CAS validate&login url[" + dest + "]");
        nodeFetch(dest, {
            method: 'GET'
        }).then(function(response) {
            return response.text()
        }).then(function(body) {
            console.info(body)
            xml2js(body, {
                explicitRoot: false,
                tagNameProcessors: [stripPrefix]
            }, function(err, serviceResponse) {
                var success = serviceResponse && serviceResponse.authenticationSuccess && serviceResponse.authenticationSuccess[0];
                var fail = serviceResponse && serviceResponse.authenticationFailure && serviceResponse.authenticationFailure[0];
                var CAS = new Object;
                if (success) {
                    var attributes = success.attributes && success.attributes[0];
                    var user = success && success.user && success.user[0];
                    var cus_name = attributes && attributes.cus_name && attributes.cus_name[0];
                    var cus_idn = attributes && attributes.cus_idn && attributes.cus_idn[0];
                    var cus_type = attributes && attributes.cus_type && attributes.cus_type[0];
                    var brancode = attributes && attributes.brancode && attributes.brancode[0];
                    var qualified_investor = attributes && attributes.qualified_investor && attributes.qualified_investor[0];
                    var cus_mphone = attributes && attributes.cus_mphone && attributes.cus_mphone[0];
                    var cus_code = attributes && attributes.cus_code && attributes.cus_code[0];

                    req.user = user;
                    CAS.haslogin = "done";
                    CAS.ticket = ticket;
                    CAS.cus_name = cus_name;
                    CAS.cus_idn = cus_idn;
                    CAS.cus_type = cus_type;
                    CAS.brancode = brancode;
                    CAS.qualified_investor = qualified_investor;
                    CAS.cus_mphone = cus_mphone;
                    CAS.cus_code = cus_code;
                    req.CAS = CAS;
                    req.session.CAS = utils.deepCopy(req.CAS);
                }
                if (fail) {
                    logger.error(fail.$);
                    res.redirect(cas_host + '/login?service=' + service);
                }
            });
        }).then(function(res) {
            next();
        })
    } else {
        console.info(cas_host + '/login?service=' + service);
        res.redirect(cas_host + '/login?service=' + service); //跳转到登陆页面
    }
}

exports.CAS = CAS;