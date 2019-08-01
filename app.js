var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var authorize = require('./common/authorize');
var morgan = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
var mainRoutes = require('./common/mainRoutes');
var logger = require('./common/logger');
var config = require('./common/config');
var utils = require('./common/utils');
var redis = require('redis');
var myRedis = require("./common/redis");
var loginNeed = require('./common/loginNeed');
var RedisStore = require('connect-redis')(session);
var helmet = require('helmet');
var compression = require('compression');
var RateLimit = require('express-rate-limit');
var CAS = require('./common/cas').CAS;
var nodeFetch = require('node-fetch');
var stripPrefix = require('xml2js/lib/processors').stripPrefix;
var xml2js = require('xml2js').parseString;
var cas = require('./common/cas').CAS();
var commonHttp = require('./common/commonHttp');
var promise = require('bluebird');
var request = require('request');

var app = express();



app.use(cookieParser('nodeCP')); //读取cookie
app.use(session({
    secret: '12345',
    name: config.session_self_name,
    cookie: {
        maxAge: config.session_expire_time
    },
    resave: false,
    saveUninitialized: true

}));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var logDirectory = __dirname + '/log'

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/publicmin/i/favicon.ico'));
app.use(morgan('[:date[iso]][:status] :method => :url', {
    stream: accessLogStream
}));



//开启GZIP压缩
app.use(compression());
//express.static()负责托管 Express 应用内的静态资源;path.join():路径合并;__dirname, 'public':路径为当前项目的绝对路径+public;
app.use("/", express.static(path.join(__dirname, 'public')));
for (var i = 0; i < config.second_domain.length; i++) {
    app.use(config.second_domain[i], express.static(path.join(__dirname, 'public')));
}



//安全性插件
app.use(helmet({
    //流量监控不拦截
    //可以设置X-Frame-Options用于限定谁可以将自己的站点放置在frame中，从而可以帮助防止点击劫持
    frameguard: false
}));

var ninetyDaysInMilliseconds = 7776000000;
app.use(helmet.hsts({
    maxAge: ninetyDaysInMilliseconds,
    force: true
}))

//限制访问频率
var limiter = new RateLimit({
    windowMs: 15 * 60 * 1000, // 15分钟 
    max: 1000, // 限制每个IP每windowMs 100个请求
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to cas requests
app.use("/cas", limiter);


//拦截器-根据请求环境设置配置文件
app.use(function(req, res, next) {
    var cur_host = req.hostname; //ip地址
    var cur_path = req.path;
    //记录当前请求的项目名
    req.bwProject = utils.getProjectPath(cur_path);
    logger.info(cur_host);
    //测试
    if (cur_host.indexOf("192.168") >= 0 || cur_host.indexOf('bundtrade.cn') >= 0 || app.get("mocha") == true) {
        //首页地址
        // config.project_url = config.project_url_test;
        config.project_url = config.project_local_url;
        //cas
        config.CAS_host = config.CAS_host_test;
        config.CAS_logout = config.CAS_logout_test;
        config.CAS_service = config.CAS_service_test;
        //Redis地址
        config.redisCluster = config.redisClusterTest;
        //brancode
        config.bran_code_bw = config.bran_code_bw_test;
        config.bran_code_renren = config.bran_code_renren_test;
        config.bran_code_joinTest = config.bran_code_joinTest_test;
        config.bran_code_thl = config.bran_code_thl_test;
        config.bran_code_yemei = config.bran_code_yemei_test;
        config.bran_code_jfl = config.bran_code_jfl_test;
        config.bran_code_xrzt = config.bran_code_xrzt_test;
        config.bran_code_jule = config.bran_code_jule_test;
        config.bran_code_qhwf = config.bran_code_qhwf_test;
        config.bran_code_xiyuan = config.bran_code_xiyuan_test;
        config.bran_code_futong = config.bran_code_futong_test;
        config.bran_code_honghe = config.bran_code_honghe_test;
        config.bran_code_wxshiminka = config.bran_code_wxshiminka_test;
        //接口地址
        config.service_restful_url = config.service_restful_urlTest;
        //接口的秘钥
        config.des_key = config.des_keyTest;
        //登录时的加密秘钥
        config.des_key_password = config.des_key_passwordTest;
        //brancode cookies加密的秘钥
        config.des_key_brancode = config.des_key_brancodeTest;
        //快投产品编码
        config.hqbProCode = config.hqbProCode_test;
        //系统状态
        config.system_mode = "DEBUG";
        next();
    }
    //仿真
    else if (cur_path.indexOf('mobilestage') >= 0 && cur_host.indexOf('mobilestage') >= 0) {
        //Redis地址
        config.redisCluster = config.redisClusterStage;
        next();
    }
    //准生产
    else if (cur_host.indexOf('act.bundwealth.com') >= 0) {
        //首页地址
        config.project_url = config.project_url_act;
        //Redis地址
        config.redisCluster = config.redisClusterPreProd;
        //cas
        config.CAS_host = config.CAS_host_act;
        config.CAS_logout = config.CAS_logout_act;
        config.CAS_service = config.CAS_service_act;
        next();
    }
    //生产
    else {
        next();
    }
});


//拦截器-根据访问路径设置渠道号
//利用session保存用户初始访问的链接
app.use(function(req, res, next) {
    var cur_path = req.path;
    var method = req.method;
    var session = req.session;
    var brancode = session[config.brancode_id] || req.cookies[config.brancode_id];
    //记录渠道号
    req.bwChannel = utils.getSecPath(cur_path);
    if (0) {
        // if (!utils.isEmpty(brancode)) {
        config.bran_code = brancode;
        //session中的brancode已存在，直接过
        next();
    } else {
        //session中的brancode不存在
        if (method == "GET") {
            //GET请求，判断二级域名赋不同的brancode
            var hasSetbrancode = false;
            config.bran_Array.forEach(function(item) {
                if (utils.getSecPath(cur_path) == item) {
                    hasSetbrancode = true;
                    session[config.brancode_id] = config["bran_code_" + item];
                    config.bran_code = config["bran_code_" + item];
                    res.cookie(config.brancode_id, config.bran_code, {
                        httpOnly: true,
                        path: '/'
                    });
                    return false;
                }
            })
            if (!hasSetbrancode) {
                session[config.brancode_id] = config.bran_code_bw;
                config.bran_code = config.bran_code_bw;
                res.cookie(config.brancode_id, config.bran_code, {
                    httpOnly: true,
                    path: '/'
                });
            }
        } else if (method == "POST") {
            //POST请求，默认赋BW的brancode
            config.bran_code = session[config.brancode_id] || req.cookies[config.brancode_id] || config.bran_code_bw;
        }

        logger.info("***Set Brancode[" + session[config.brancode_id] + "]");
        next();
    }


})


//session 过滤
app.use(function(req, res, next) {
    var cas_host = config.CAS_host;
    req.session._garbage = Date();
    req.session.touch();
    // if (!req.session.CAS && req.cookies[config.cas_ticket]) {
    //     cas.validate(req, res, next);
    //     return;
    // }
    //没有TGC,清空session

    if (req.cookies[config.cas_ticket]) {
        if (req.cookies[config.cas_ticket].length > 5) {
            //没有session有TGC
            if (!req.session.CAS) {
                cas.validate(req, res, next);
            }
        } else {
            req.session.CAS = null;
        }
    } else {
        req.session.CAS = null;
    }

    next();

});

//拦截退出
app.use(function(req, res, next) {
    if (req.session.CAS != null) {
        if (req.body.logoutRequest) {
            req.session.CAS = null;
            cas.logout(req, res);
        }
    }
    next();
})

//白名单拦截
app.use(function(req, res, next) {
    var goCas = true;
    var url = config.donotNeedCas;
    for (var i = 0; i < url.length; i++) {
        if ("/" + url[i] == req._parsedUrl.pathname || ("/" + url[i] + "/") == req._parsedUrl.pathname) {
            goCas = false;
            break;
        }
    }
    if (goCas) {
        cas.validate(req, res, next);
    } else {
        next();
    }
})




//总路由
app = mainRoutes.setRoutes(app);

//拦截404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    logger.info("***No such route:" + req.url)
    err.status = 404;
    res.render('error/404');
    // next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/error', {
        message: err.message,
        error: {}
    });
});

//process模块允许你获得或者修改当前node进程的设置，不想其他的模块，process是一个全局进程(node主进程)，你可以直接通过process变量直接访问它。
process.on('uncaughtException', function(err) {
    logger.error("uncaughtException ERROR");
    if (typeof err === 'object') {
        if (err.message) {
            logger.error('ERROR: ' + err.message)
        }
        if (err.stack) {
            logger.error(err.stack);

        }
    } else {
        logger.error('argument is not an object');
    }
});


module.exports = app;