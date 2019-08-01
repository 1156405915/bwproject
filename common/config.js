//系统静态配置文件


//系统模式
exports.system_mode = "NORMAL"; //DEBUG-调试,NORMAL-正常
//Nodejs容器的session名称
exports.session_self_name = "NPsessionId";

// CAS-ticket
exports.cas_ticket = "TGC"

//Growing统计代码客户信息cookie
exports.statistical_id = "STDT";

//session超时时间
// exports.session_expire_time = 1800000; //ms
exports.session_expire_time = 120000; //ms
//cookies超时时间
exports.cookie_expire_time = 1800000; //ms
//防刷cookies超时时间
exports.protect_cookie_expire_time = 5184000000; //ms
//redis缓存超时时间
exports.redis_expire_time = 60; //s

//是否使用RESTFul接口
exports.RESTFul = true;
//session中保存用户名的字段
exports.session_userid = "user_id";
//通用成功返回
exports.common_success = "SUCCESS";
//通用失败返回
exports.common_failed = "FAILED";
//Redis操作失败通用返回
exports.redis_failed = "redis_failed";

//cas测试地址
exports.CAS_host_test = "http://dev.bundtrade.cn/bwcas";
//cas测试登出地址
exports.CAS_logout_test = "http://dev.bundtrade.cn/bwcas/logout";
//cas测试node验证地址
exports.CAS_service_test = "http://dev.bundtrade.cn/cas/validate";
// exports.CAS_service_test="http://192.168.1.109:8888/cas/validate";
// exports.CAS_service_test = "https://www.bundtrade.cn/BundTrade/userInfo!userInfoNew.action?muid=x";


//cas准生产地址
exports.CAS_host_act = "https://www.bundwealth.com/bwcastest/login";
//cas准生产登出地址
exports.CAS_logout_act = "https://www.bundwealth.com/bwcastest/logout";
//cas准生产node验证地址
exports.CAS_service_act = "https://act.bundwealth.com/cas/validate";

//cas生产地址
exports.CAS_host = "https://www.bundwealth.com/bwcas/login";
//cas准生产登出地址
exports.CAS_logout = "https://www.bundwealth.com/bwcas/logout";
//cas生产node验证地址
exports.CAS_service = "https://www.bundwealth.com/cas/validate";


//首页测试地址
exports.project_url_test = "http://dev.bundtrade.cn";
//首页准生产地址
exports.project_url_act = "https://act.bundwealth.com";
//首页生产地址
exports.project_url = "https://www.bundwealth.com";
//本地
exports.project_local_url = "http://192.168.43.64:8888";

//远程图片服务器
exports.img_upload_server_test = {
    host: '121.43.56.122',
    port: 22,
    username: 'bwsftp',
    password: 'bwsftp!123'
}

var img_upload_server = {
    host: '121.43.56.122',
    port: 22,
    username: 'bwsftp',
    password: 'ftp!01mLMlhfJx'
}

//渠道号cookie
exports.brancode_id = "branCode";
/*渠道号 start*/
//与服务数据交互时的渠道号
exports.bran_code = "B150515002"; //准生产和生产环境

//BW
exports.bran_code_bw = "B150515002"; //准生产、生产环境
exports.bran_code_bw_test = "G150512001"; //测试环境
//南通人人投资管理有限公司
exports.bran_code_renren = "B160527001"; //准生产、生产环境
exports.bran_code_renren_test = "G160331002"; //测试环境
//joinTest
exports.bran_code_joinTest = "G160810002"; //准生产、生产环境
exports.bran_code_joinTest_test = "G160810002"; //测试环境
//广州添惠隆资产管理有限公司
exports.bran_code_thl = "B151012001"; //准生产、生产环境
exports.bran_code_thl_test = "B151012001"; //测试环境
//上海野莓信息技术有限公司
exports.bran_code_yemei = "B161018001"; //准生产、生产环境
exports.bran_code_yemei_test = "B161018001"; //测试环境
//南京嘉富利投资咨询有限公司
exports.bran_code_jfl = "B161014001"; //准生产、生产环境
exports.bran_code_jfl_test = "B161014001"; //测试环境
//山西信睿中天金融服务外包有限公司
exports.bran_code_xrzt = "B160909001"; //准生产、生产环境
exports.bran_code_xrzt_test = "B160909001"; //测试环境
//居勒装饰设计工程（上海）有限公司
exports.bran_code_jule = "B161010001"; //准生产、生产环境
exports.bran_code_jule_test = "B161010001"; //测试环境
//深圳前海蜈蚨互联网金融服务有限公司
exports.bran_code_qhwf = "B161011001"; //准生产、生产环境
exports.bran_code_qhwf_test = "B161011001"; //测试环境
//玺元资产管理（上海）有限公司
exports.bran_code_xiyuan = "B160914001"; //准生产、生产环境
exports.bran_code_xiyuan_test = "B160914001"; //测试环境
//扬州富通金融信息服务有限公司
exports.bran_code_futong = "B160914002"; //准生产、生产环境
exports.bran_code_futong_test = "B160914002"; //测试环境
//北京弘合通元科技有限公司
exports.bran_code_honghe = "B160706003"; //准生产、生产环境
exports.bran_code_honghe_test = "B160706003"; //测试环境
//无锡市民卡
exports.bran_code_wxshiminka = "B161228001"; //准生产、生产环境
exports.bran_code_wxshiminka_test = "G160000011"; //测试环境

//上海数融资产管理有限公
exports.bran_code_srzc = "B170307001"; //准生产、生产环境
exports.bran_code_srzc_test = "B170307001"; //测试环境

/*渠道号 end*/

/*渠道的二级域名*/
//joinTest
exports.bran_joinTest = "joinTest";
//南通人人投资管理有限公司
exports.bran_renren = "renren";
//广州添惠隆资产管理有限公司
exports.bran_thl = "thl";
//上海野莓信息技术有限公司
exports.bran_yemei = "yemei";
//南京嘉富利投资咨询有限公司
exports.bran_jfl = "jfl";
//山西信睿中天金融服务外包有限公司
exports.bran_xrzt = "xrzt";
//居勒装饰设计工程（上海）有限公司
exports.bran_jule = "jule";
//深圳前海蜈蚨互联网金融服务有限公司
exports.bran_qhwf = "qhwf";
//玺元资产管理（上海）有限公司
exports.bran_xiyuan = "xiyuan";
//扬州富通金融信息服务有限公司
exports.bran_futong = "futong";
//北京弘合通元科技有限公司
exports.bran_honghe = "honghe";
//无锡市民卡
exports.bran_wxshiminka = "wxshiminka";
//数融资产
exports.bran_srzc = "srzc";
/*渠道的二级域名*/


/*二级域名*/
exports.second_domain = [
    //joinTest
    "/" + this.bran_joinTest,
    //南通人人投资管理有限公司
    "/" + this.bran_renren,
    //广州添惠隆资产管理有限公司
    "/" + this.bran_thl,
    //上海野莓信息技术有限公司
    "/" + this.bran_yemei,
    //南京嘉富利投资咨询有限公司
    "/" + this.bran_jfl,
    //山西信睿中天金融服务外包有限公司
    "/" + this.bran_xrzt,
    //居勒装饰设计工程（上海）有限公司
    "/" + this.bran_jule,
    //深圳前海蜈蚨互联网金融服务有限公司
    "/" + this.bran_qhwf,
    //玺元资产管理（上海）有限公司
    "/" + this.bran_xiyuan,
    //扬州富通金融信息服务有限公司
    "/" + this.bran_futong,
    //北京弘合通元科技有限公司
    "/" + this.bran_honghe,
    //无锡市民卡
    "/" + this.bran_wxshiminka,
    //
    "/" + this.bran_srzc
];
/*二级域名*/



/*渠道的二级域名数组*/
exports.bran_Array = [
        //joinTest
        "joinTest",
        //南通人人投资管理有限公司
        "renren",
        //广州添惠隆资产管理有限公司
        "thl",
        //上海野莓信息技术有限公司
        "bran_yemei",
        //南京嘉富利投资咨询有限公司
        "jfl",
        //山西信睿中天金融服务外包有限公司
        "xrzt",
        //居勒装饰设计工程（上海）有限公司
        "jule",
        //深圳前海蜈蚨互联网金融服务有限公司
        "qhwf",
        //玺元资产管理（上海）有限公司
        "xiyuan",
        //扬州富通金融信息服务有限公司
        "futong",
        //北京弘合通元科技有限公司
        "honghe",
        //无锡市民卡
        "wxshiminka",
        //上海数融资产管理有限公司
        "srzc"

    ]
    /*渠道的二级域名数组*/

/*DES秘钥*/
//接口的秘钥
exports.des_keyTest = "01234567"; //测试环境
exports.des_key = "27385930"; //准生产和生产环境

//登录时的加密秘钥
exports.des_key_password = "yTuaqjx4"; //准生产和生产环境
exports.des_key_passwordTest = "23456789"; //测试环境

//brancode cookies加密的秘钥
exports.des_key_brancode = "fiYr3efn"; //准生产和生产环境
exports.des_key_brancodeTest = "fiYr3efn"; //测试环境

//统计代码中cusCode加密的秘钥
exports.des_key_cusCode = "bcda1573"; //准生产和生产环境
exports.des_key_cusCodeTest = "8uhb*UHB"; //测试环境
/*DES秘钥*/

/*报文头信息*/
//与服务数据交互时，报文头的版本号
exports.head_version = "1.0";
//与服务数据交互时，报文头的系统编号
exports.head_src_code = "pc";
//与服务通讯错误返回标识
exports.connect_error = "connet-error";
//平台类型,INTERPF-内部，EXTERPF-外部
exports.pfType = "INTERPF";
/*报文头信息*/


// 服务接口调用超时时间
exports.service_timeout = 10000;

//RESTFul服务路径头部
// exports.service_restful_urlTest = "http://172.31.32.30:8080/bwgate/"; // 本机测试
// exports.service_restful_urlTest = "http://172.31.32.55:8080/bwgate/"; // 本机测试
exports.service_restful_urlTest = "http://192.168.43.22:8180/bwgate"; // 测试环境
exports.service_restful_urlStage = "https://www.bundtrade.cn/bwgate/"; // 仿真环境
exports.service_restful_urlPreProd = "https://www.bundwealth.com/bwgatetest/"; // 准生产环境
exports.service_restful_url = "https://www.bundwealth.com/bwgate/"; // 生产环境

//阿里云静态图片地址
exports.img_path_online = "https://act.bundwealth.com";

//redis集群IP
exports.redisClusterTest = [{
    host: "192.168.44.21",
    port: 7000
}, {
    host: "192.168.44.22",
    port: 7000
}, {
    host: "192.168.44.21",
    port: 7001
}, {
    host: "192.168.44.22",
    port: 7001
}, {
    host: "192.168.44.23",
    port: 7000
}, {
    host: "192.168.44.23",
    port: 7001
}]; //测试环境

exports.redisClusterStage = [{
    host: "192.168.43.193",
    port: 7000
}, {
    host: "192.168.43.194",
    port: 7000
}, {
    host: "192.168.43.193",
    port: 7001
}, {
    host: "192.168.43.194",
    port: 7001
}, {
    host: "192.168.43.195",
    port: 7000
}, {
    host: "192.168.43.195",
    port: 7001
}]; //仿真环境

exports.redisClusterPreProd = [{
    host: "10.96.64.170",
    port: 7000
}, {
    host: "10.96.64.170",
    port: 7001
}, {
    host: "10.96.64.171",
    port: 7000
}, {
    host: "10.96.64.171",
    port: 7001
}, {
    host: "10.96.64.172",
    port: 7000
}, {
    host: "10.96.64.172",
    port: 7001
}]; //准生产环境

exports.redisCluster = [{
    host: "10.96.64.156",
    port: 7000
}, {
    host: "10.96.64.156",
    port: 7001
}, {
    host: "10.96.64.157",
    port: 7000
}, {
    host: "10.96.64.157",
    port: 7001
}, {
    host: "10.96.64.158",
    port: 7000
}, {
    host: "10.96.64.158",
    port: 7001
}]; //生产环境



/*首页图片picTY*/
//首页banner轮播
exports.circleImg_picTy = "0001";
//首页三位一体
exports.ThreeActivityImg_picTy = "0002";
//合作机构
exports.cooperationImg_picTy = "0003";
//四位一体
exports.fourActivityImg_picTy = "0015";
//理财险图片
exports.moneyImg_picTy = "0100";
//健康险图片
exports.healthImg_picTy = "0101";
//人寿险图片
exports.personImg_picTy = "0102";
//意外险图片
exports.accidentImg_picTy = "0103";
//保险LOGO
exports.logoImg_picTy = "0120";
//保险广告图
exports.advertisementImg_picTy = "0121";
/*首页图片picTY end*/

//快投产品编码 测试环境
exports.hqbProCode_test = "HQB20161026022909481";
//快投产品编码 生产环节
exports.hqbProCode = "HQB20161031084230726";

//不需要CAS登陆的白名单
exports.donotNeedCas = [
    "",
    "/",
    "cas/logout",
    "service/indexCircleImg",
    "service/indexImg",
    //joinTest
    "joinTest",
    //南通人人投资管理有限公司
    "renren",
    //广州添惠隆资产管理有限公司
    "thl",
    //上海野莓信息技术有限公司
    "bran_yemei",
    //南京嘉富利投资咨询有限公司
    "jfl",
    //山西信睿中天金融服务外包有限公司
    "xrzt",
    //居勒装饰设计工程（上海）有限公司
    "jule",
    //深圳前海蜈蚨互联网金融服务有限公司
    "qhwf",
    //玺元资产管理（上海）有限公司
    "xiyuan",
    //扬州富通金融信息服务有限公司
    "futong",
    //北京弘合通元科技有限公司
    "honghe",
    //无锡市民卡
    "wxshiminka",
    //上海数融资产管理有限公司
    "srzc",
    "service/getUserInfo",
    // 公募基金：
    'mutualfunds',
    // 高端理财：
    'privatebanking',
    // 新手专享：
    'newbiezone',
    // 转让专区：
    'transferzone',
    //活期
    "currentdeposit",
    //定期
    "timedeposit",
    //保险
    "insurance"

]