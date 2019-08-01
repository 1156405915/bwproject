var log4js = require('log4js');
var log4jx = require('log4jx');

log4jx(log4js, {
    path: __dirname,
    format: "[@date][@level][@pid][@memory]@category -@data (@file:@line:@column)"
});
log4js.configure({
    appenders: [{
        type: 'console',
        encoding: 'UTF-8',
        category: "console"
    }, {
        type: "file",
        encoding: 'UTF-8',
        maxLogSize: 10240000,
        filename: "./log/debug.log",
        category: ['bund', 'console']
    }],
    // replaceConsole: true,   //替换console.log  
    levels: {
        console: 'ERROR,INFO'
    }
});

var dateFileLog = log4js.getLogger('console');


exports.logger = dateFileLog;

exports.use = function(app) {
    //页面请求日志,用auto的话,默认级别是WARN 
    app.use(log4js.connectLogger(dateFileLog, {
        level: 'debug',
        format: ':method :url'
    }));
    return app;
}
exports.trace = function(trace) {
    dateFileLog.trace(trace);
}
exports.info = function(info) {
    dateFileLog.info(info);
}
exports.debug = function(debug) {
    dateFileLog.debug(debug);
}
exports.error = function(error) {
    dateFileLog.error(error);
}