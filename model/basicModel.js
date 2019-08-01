/* 基础服务实体 */
var commonMsg = require('./commonMsg').commonMsg;
var config = require('../common/config');

// 首页轮播图实体

//继承基类
commonMsg.call(this);

//类型,0010 H5首页轮播图
this.picTy = "0001";


this.setPicTy = function(picTy) {
    this.picTy = picTy;
}



// 页面轮播图、活动模块、投资引导、合作机构和保险产品部位的图片资源获取
exports.indexImgModel = function() {
    //继承基类
    commonMsg.call(this);

    // circleImg_picTy – 首页轮播
    // ThreeActivityImg_picTy – 首页三位一体
    // cooperationImg_picTy – 合作机构
    // fourActivityImg_picTy – 首页四位一体
    // moneyImg_picTy – 理财险图片
    // healthImg_picTy – 健康险图片
    // personImg_picTy – 人寿险图片
    // accidentImg_picTy – 意外险图片
    // logoImg_picTy – 保险LOGO
    // advertisementImg_picTy – 保险广告图

    this.picTy = config.circleImg_picTy + "," +
        config.ThreeActivityImg_picTy + "," +
        config.cooperationImg_picTy + "," +
        config.fourActivityImg_picTy + "," +
        config.moneyImg_picTy + "," +
        config.healthImg_picTy + "," +
        config.personImg_picTy + "," +
        config.accidentImg_picTy + "," +
        config.logoImg_picTy + "," +
        config.advertisementImg_picTy;

    this.setPicTy = function(picTy) {
        this.picTy = picTy;
    }

};

// 查询精品产品接口
exports.choiceProModel = function() {
    //继承基类
    commonMsg.call(this);

    //记录条数 默认4
    this.rowSize = "4";
    //0022首页精品,0025定期精品
    this.picType = "0022"

    this.setrowSize = function(rowSize) {
        this.rowSize = rowSize;
    }

    this.setpicType = function(picType) {
        this.picType = picType;
    }

};

/*用户信息获取*/
exports.getCusInformationModel = function() {
    //继承基类
    commonMsg.call(this);

    //用户编号
    var cusCode;

    this.setCusCode = function(cusCode) {
        this.cusCode = cusCode;
    }

};

// 查询话题宝接口
exports.queryHtbListsModel = function() {
    //继承基类
    commonMsg.call(this);

    //记录条数 默认3
    this.rowSize = "3";

    this.setrowSize = function(rowSize) {
        this.rowSize = rowSize;
    }

};

// 查询小额理财接口
exports.queryMicroFincModel = function() {
    //继承基类
    commonMsg.call(this);

    //记录条数 默认3
    this.rowSize = "3";

    this.setrowSize = function(rowSize) {
        this.rowSize = rowSize;
    }

};

// 查询快投接口
exports.queryHqbListsModel = function() {
    //继承基类
    commonMsg.call(this);

    //可购买条数 默认1
    this.buyVar = "1";

    //可购买条数 默认1
    this.proCode = config.hqbProCode;

    this.setbuyVar = function(buyVar) {
        this.buyVar = buyVar;
    }

    this.sethqbProCode = function(hqbProCode) {
        this.proCode = hqbProCode;
    }

};

// 固定收益接口
exports.queryARListsModel = function() {
    //继承基类
    commonMsg.call(this);

    //记录条数 默认3
    this.rowSize = "3";

    this.setrowSize = function(rowSize) {
        this.rowSize = rowSize;
    }

};

// 月月开花接口
exports.queryInnoListsModel = function() {
    //继承基类
    commonMsg.call(this);

    //记录条数 默认3
    this.rowSize = "3";

    this.setrowSize = function(rowSize) {
        this.rowSize = rowSize;
    }

};

// 公募基金接口
exports.qryFundModel = function() {
    //继承基类
    commonMsg.call(this);

    //记录条数 默认3
    this.rowSize = "3";

    this.setrowSize = function(rowSize) {
        this.rowSize = rowSize;
    }

};