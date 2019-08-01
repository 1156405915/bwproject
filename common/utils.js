var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var config = require('./config');
var logger = require('./logger').logger;
var channelIndex = require('../common/channelIndex');



// des加密算法
/**
 * 
 * 
 * @param {any} str
 * @returns
 */
exports.des_encrypt = function(str) {
    try {
        //encrypt
        var cipher = crypto.createCipheriv("des-cbc", new Buffer(config.des_key), new Buffer(config.des_key));
        cipher.setAutoPadding(true); //default true
        var ciph = cipher.update(str, 'utf8', 'base64');
        ciph += cipher.final('base64');
        //console.log("des-ecb", ciph);
        return ciph;
    } catch (e) {
        logger.error(e);
    }
}

// des解密算法
/**
 * 
 * 
 * @param {any} str
 * @returns
 */
exports.des_decrypt = function(str) {
    try {
        //decrypt
        var decipher = crypto.createDecipheriv("des-cbc", new Buffer(config.des_key), new Buffer(config.des_key));
        decipher.setAutoPadding(true);
        var txt = decipher.update(str, 'base64', 'utf8');
        txt += decipher.final('utf8');
        // console.info(txt);
        return txt;
    } catch (e) {
        logger.error("decrypt err str[" + str + "] ERROR[" + e + "]");
    }
}

// 模拟后端登录密码加密
/**
 * 
 * 
 * @param {any} str
 * @returns
 */
exports.pwd_encrypt = function(str) {
    try {
        //他们很变态的加密了2次
        var first = crypto.createHash('sha512');
        first.update(str);
        var begin = first.digest('hex', 'utf8');
        var second = crypto.createHash('sha512');
        second.update(begin);
        var end = second.digest('hex', 'utf8');
        return end;
    } catch (e) {
        logger.error(e);
    }
}

// des加密用户密码
/**
 * 
 * 
 * @param {any} str
 * @returns
 */
exports.pwd_encrypt_des = function(str) {
    try {
        //encrypt
        var cipher = crypto.createCipheriv("des-cbc", new Buffer(config.des_key_password), new Buffer(config.des_key_password));
        cipher.setAutoPadding(true); //default true
        var ciph = cipher.update(str, 'utf8', 'base64');
        ciph += cipher.final('base64');
        //console.log("des-ecb", ciph);
        return ciph;
    } catch (e) {
        logger.error(e);
    }
}


// des加密brancode
/**
 * 
 * 
 * @param {any} str
 * @returns
 */
exports.brancode_encrypt_des = function(str) {
    try {
        //encrypt
        var cipher = crypto.createCipheriv("des-cbc", new Buffer(config.des_key_brancode), new Buffer(config.des_key_brancode));
        cipher.setAutoPadding(true); //default true
        var ciph = cipher.update(str, 'utf8', 'base64');
        ciph += cipher.final('base64');
        //console.log("des-ecb", ciph);
        return ciph;
    } catch (e) {
        logger.error(e);
    }
}


/**
 * des加密cusCode
 * 
 * @param {any} str
 * @returns
 */
exports.cuscode_encrypt_des = function(str) {
    try {
        //encrypt
        var cipher = crypto.createCipheriv("des-cbc", new Buffer(config.des_key_cusCode), new Buffer(config.des_key_cusCode));
        cipher.setAutoPadding(true); //default true
        var ciph = cipher.update(str, 'utf8', 'base64');
        ciph += cipher.final('base64');
        //console.log("des-ecb", ciph);
        return ciph;
    } catch (e) {
        logger.error(e);
    }
}

// 
/**
 * 
 * des解密brancode
 * @param {any} str
 * @returns
 */
exports.brancode_des_decrypt = function(str) {
    try {
        //decrypt
        var decipher = crypto.createDecipheriv("des-cbc", new Buffer(config.des_key_brancode), new Buffer(config.des_key_brancode));
        decipher.setAutoPadding(true);
        var txt = decipher.update(str, 'base64', 'utf8');
        txt += decipher.final('utf8');
        // console.info(txt);
        return txt;
    } catch (e) {
        logger.error(e);
    }
}

// 生成唯一的标识guid
/**
 * 
 * 
 * @returns
 */
exports.guidGenerator = function() {
    try {
        /**
         * 
         * 
         * @returns
         */
        var S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    } catch (e) {
        logger.error(e);
    }
}

//获取客户端ip地址
/**
 * 
 * 
 * @param {any} req
 * @returns
 */
exports.getClientIP = function(req) {
    try {
        var ipAddress;
        var headers = req.headers;
        var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
        forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
        logger.info("*** ClientIP forwardedIpsStr=" + forwardedIpsStr + "|req.connection.remoteAddress=" + req.connection.remoteAddress + "|req.socket.remoteAddress=" + req.socket.remoteAddress);
        if (!ipAddress) {
            ipAddress = req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
        }
        ipAddress = ipAddress.substring(ipAddress.lastIndexOf(":") + 1);
        return ipAddress;
    } catch (e) {
        logger.error(e);
    }
}

//生成token
/**
 * 
 * 
 * @returns
 */
exports.tokenGenerator = function() {
    try {
        var guid = this.guidGenerator();
        return guid;
    } catch (e) {
        logger.error(e);
    }
}

// yyyy-mm-dd转换为yyyy年mm月dd日
/**
 * 
 * 
 * @param {any} date
 * @returns
 */
exports.exchangeDate = function(date) {
    try {
        var _date = date;
        var y = _date.substring(0, 4);
        var m = _date.substring(5, 7);
        var d = _date.substring(8, 10);
        return y + "年" + m + "月" + d + "日";
    } catch (e) {
        logger.error(e);
    }
}

//金额格式化，s-金额（元），n-保留小数位数
/**
 * 
 * 
 * @param {any} s
 * @param {any} n
 * @returns
 */
exports.formatMoney = function(s, n) {
    try {
        var PorN = "P";
        var n = n;
        var s = s;
        if ((s + "").indexOf("-") == 0) {
            s = (s + "").replace("-", "");
            PorN = "N";
        }
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse();
        var r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        if (PorN == 'N') {
            return "-" + t.split("").reverse().join("") + "." + r;
        } else {
            return t.split("").reverse().join("") + "." + r;
        }

    } catch (e) {
        logger.error(e);
    }
}

//金额格式化，s-金额（元），n-保留小数位数，没有小数
/**
 * 
 * 
 * @param {any} s
 * @param {any} n
 * @returns
 */
exports.formatMoneyZero = function(s, n) {
    try {
        var PorN = "P";
        var n = n;
        var s = s;
        if ((s + "").indexOf("-") == 0) {
            s = (s + "").replace("-", "");
            PorN = "N";
        }
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse();
        var r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        if (PorN == 'N') {
            return "-" + t.split("").reverse().join("");
        } else {
            return t.split("").reverse().join("");
        }

    } catch (e) {
        logger.error(e);
    }
}

//电话号码当中变*
/**
 * 
 * 
 * @param {any} phone
 * @returns
 */
exports.exchangephone = function(phone) {
    try {
        return phone.substring(0, 3) + "****" + phone.substring(8, 11);
    } catch (e) {
        logger.error(e);
    }
}


//base64 加密
/**
 * 
 * 
 * @param {any} str
 * @returns
 */
exports.base64encode = function(str) {
        try {
            return new Buffer(str).toString('base64')
        } catch (e) {
            logger.error(e);
        }
    }
    //base64 解密
    /**
     * 
     * 
     * @param {any} str
     * @returns
     */
exports.base64decode = function(str) {
    try {
        return new Buffer(str, 'base64').toString();
    } catch (e) {
        logger.error(e);
    }
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
/**
 * 
 * 
 * @param {any} fmt
 * @returns
 */
Date.prototype.Format = function(fmt) {
        try {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        } catch (e) {
            logger.error(e);
        }
    }
    //移除字符串两端的空白字符
    /**
     * 
     * 
     * @returns
     */
String.prototype.trim = function() {
    try {
        return this.replace(/(^\s)|(\s*$)/g, "");
    } catch (e) {
        logger.error(e);
    }
};


//快速排序
//参数：数组
/**
 * 
 * 
 * @param {any} list
 * @returns
 */
exports.quickSort = function(list) {
    try {
        if (list.length == 0) {
            return [];
        } else {
            var lesser = []; //小于基准值的序列
            var greater = []; //大于基准值的序列
            var pivot = list[0];
            for (var i = 1; i < list.length; i++) {
                if (list[i] <= pivot) {
                    lesser.push(list[i]);
                } else {
                    greater.push(list[i]);
                }
            }
        }
        return quickSort(lesser).concat(pivot, quickSort(greater));
    } catch (e) {
        logger.error(e);
    }
}

//冒泡排序,用于较少的数据或已大致排好的数据(首页图片)
exports.bubbleSort = function(objarray, sortNo) {
    try {
        var temp;
        for (var i = 0; i < objarray.length - 1; i++) {
            for (var j = i + 1; j < objarray.length; j++) {
                if (objarray[i].sortNo > objarray[j].sortNo) { //如果前面的数据比后面的大就交换  
                    temp = objarray[i];
                    objarray[i] = objarray[j];
                    objarray[j] = temp;
                }
            }
        }
        return objarray;
    } catch (e) {
        logger.error("***冒泡排序错误bubbleSort***" + e);
    }
}

//
/**
 * 获得当前请求的项目名称
 * 
 * @param {any} cur_path
 * @returns
 */
exports.getProjectPath = function(cur_path) {
    var arrObj = cur_path.split("\/");
    var project_name = arrObj[1];
    var channel_name = arrObj[2];
    return project_name;
}

//获得二级域名
/**
 * 
 * 
 * @param {any} cur_path
 * @returns
 */
exports.getSecPath = function(cur_path) {
    var arrObj = cur_path.split("\/");
    var project_name = arrObj[0];
    var channel_name = arrObj[1];
    return channel_name;
}

//判断是否有中文
/**
 * 
 * 
 * @param {any} str
 * @returns
 */
exports.hasChinese = function(str) {
    var reg = /[\u4e00-\u9fa5]/g;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
}

//获取当前项目名+渠道名的相对路径
/**
 * 
 * 
 * @param {any} req
 * @returns
 */
exports.getRelativePath = function(req) {
    return "/" + req.bwProject + "/" + req.bwChannel
}

//判断对象是否为空
//支持 object/string
/**
 * 
 * 
 * @param {any} obj
 * @returns
 */
exports.isEmpty = function(obj) {
    if (typeof obj == "string") {
        obj = obj.replace(/\s/g, "");
        if (obj != null && obj != undefined && obj != "" && obj != "undefined") {
            return false;
        } else {
            return true;
        }
    } else if (typeof obj == "object") {
        for (var key in obj) {
            return false;
        }
        return true;
    } else if (typeof obj == "boolean") {
        if (obj) {
            return true;
        } else {
            return false;
        }

    } else {
        return true;
    }
}

//从cookie取来源,BW_SROUCE
/**
 * 
 * 
 * @param {any} req
 * @returns
 */
exports.takeBWSource = function(req) {
    var bw_source = req.cookies[config.bw_source];
    if (!this.isEmpty(bw_source)) {
        var srouce = bw_source.split("#");
        var result = {
            pre_source: srouce[0],
            pre_source_det: srouce[1]
        }
        return result;
    } else {
        return false;
    }
}

//判断渠道中是否有特殊的首页配置
/**
 * 
 * 
 * @param {any} req
 * @returns
 */
exports.ifChannelIndex = function(req) {
    if (channelIndex.channelSpecialIndex[req.bwChannel]) {
        return true
    } else {
        return false;
    }
}

//取多渠道中的首页地址
/**
 * 
 * 
 * @param {any} req
 * @returns
 */
exports.getChannelIndex = function(req) {
    return channelIndex.channelSpecialIndex[req.bwChannel] || config.defaultIndex;
}


//取对象中的属性名
//isFunc:是否包含function属性
/**
 * 
 * 
 * @param {any} object
 * @param {any} isFunc
 * @returns
 */
exports.getObjectOwnProp = function(object, isFunc) {
    isFunc = isFunc || false;
    if (typeof object !== "object") {
        throw "param must be object";
    };
    var result = [];
    for (prop in object) {
        //自有属性
        if (object.hasOwnProperty(prop)) {
            if (isFunc) {
                result.push(prop);
            } else {
                if (typeof prop != "function") {
                    result.push(prop);
                }
            }
        };
    };
    return result;
};

//对象深拷贝
/**
 * 
 * 
 * @param {any} obj
 * @returns
 */
exports.deepCopy = function(obj) {
    var result = {};
    for (var key in obj) {
        result[key] = typeof obj[key] === 'object' ? deepCoyp(obj[key]) : obj[key];
    }
    return result;
}

/**
 * 
 * 判断省份证男女
 * @param {any} str
 * @returns string
 */
exports.getIfGender = function(str) {
    var gender = new String();
    if (str.length == 15) {
        var last_one = parseInt(str.substring(14)); // 身份证为15位，倒数最后一位数字为是奇数为男性，偶数为女性
        if (last_one % 2 == 0) {
            gender = "女士";
        } else {
            gender = "先生";
        }

    } else if (str.length == 18) {
        var last_two = parseInt(str.substring(16, 17)); // 身份证为18位，倒数第二位数字为为奇数为男性，偶数为女性
        if (last_two % 2 == 0) {
            gender = "女士";
        } else {
            gender = "先生";
        }
    }
    return gender;
}

//百分比保留两位小数（不四舍五入）
exports.getTwoDotPer = function(num) {
    return parseInt(num * 100) / 100;
}