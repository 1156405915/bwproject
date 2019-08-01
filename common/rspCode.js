/*通用类响应码*/
//交易成功
exports.SUCCESS = "000";
//禁止访问
exports.ACCESS_FORBIDDEN = "999";
//系统异常
exports.SYS_ERROR = "998";
//报文解析错误
exports.MSG_DECODE_ERROR = "997";
//报文域格式或内容错误
exports.FIELD_ERROR = "996";
//渠道不存在
exports.CHENNEL_NOT_EXIST = "994";
//服务类型不存在
exports.SERVICE_NOT_EXIST = "995";
//服务类型不存在
exports.NO_DATA_FOUND = "989";

/*客户类响应码*/
//客户已注册
exports.CUS_EXIST = "001";
//客户信息冲突
exports.CUS_CONFLICT = "002";
//客户不存在
exports.CUS_NOT_EXIST = "003";
//推荐人不存在
exports.CUS_REF_NOT_EXIST = "004";
//理财顾问不存在
exports.CUS_IFA_NOT_EXIST = "005";
//用户重复提交
exports.CUS_REPEATED_REG = "007";
//注册成功，发放投资劵失败
exports.CUS_GRANT_CHIT_FAIL = "010";
/*登录*/
//用户类型不存在
exports.USERTYPE_NOT_EXIST = "011";
//账号或密码错误
exports.ACCOUNT_OR_PWD_ERROR = "012";
//supay授权用户，只能在supay使用
exports.IS_SUPAY = "013";
//您的账号不可用，如有疑问请联系客服
exports.STOP_YN_isY = "014";
//您的账号不可用，如有疑问请联系客服
exports.PWDERR_USER_LOCK = "015";
//账户已注销
exports.CANCEL_isY = "016";
//客户已登录成功
exports.CUS_LOGIN_SUCCESS = "017";

/*短信*/
//短信发送过于频繁，请稍后重试
exports.SMS_SEND_FREQUENTLY = "101";
//当日短信验证码已超最大限制
exports.SMS_SEND_TIMES_LIMIT = "102";
//短信发送失败
exports.SMS_SEND_ERRER = "103";

//PC轮播取得成功
exports.PC_PLAYBYTURN_SUCCESS = "000";

/*登录*/
//用户类型不存在
exports.USERTYPE_NOT_EXIST = "011";
//账号或密码错误
exports.ACCOUNT_OR_PWD_ERROR = "012";
//supay授权用户，只能在supay使用
exports.IS_SUPAY = "013";
//您的账号不可用，如有疑问请联系客服
exports.STOP_YN_isY = "014";
//您的账号不可用，如有疑问请联系客服
exports.PWDERR_USER_LOCK = "015";
//账户已注销
exports.CANCEL_isY = "016";
//客户已登录成功
exports.CUS_LOGIN_SUCCESS = "017";

/*充值/取现前的校验*/
/*
点击充值  BIND_SAVECARD  和 BIND_SAME_CARD 和 BIND_NOT_SAME_CARD   h5.pay.trans.withholdingDeposit!toexecute3.action  
点击充值  BUND_DRAWCARD   弹err4，确认后 进入 h5.boundCard!toexecute.action

点击取现  BUND_DRAWCARD  和 BIND_SAME_CARD  进入 h5.pay.trans.withdrawAccount!toexecute2.action
点击取现  BIND_NOT_SAME_CARD  弹err5，确认后 进入 h5.boundCard!boundCardDraw.action
点击取现  BIND_SAVECARD h5.boundCard!boundCardDraw.action

点击我的银行卡 NOT_REALNAME  进  
点击我的银行卡 NOT_SETPWD   进   
点击我的银行卡 FREEZE_Y   弹错
点击我的银行卡 NOT_BIND_CARD BIND_SAVECARD BIND_DRAWCARD BIND_NOT_SAME_CARD BIND_SAME_CARD 直接进 h5.boundCard!toexecute.action
*/
//未实名  
exports.NOT_REALNAME = "NOT_REALNAME";
//未设置交易密码 
exports.NOT_SETPWD = "NOT_SETPWD";
//账户冻结
exports.FREEZE_Y = "FREEZE_Y";
//未绑卡 
exports.NOT_BIND_CARD = "NOT_BIND_CARD";
//只绑定充值 
exports.BIND_SAVECARD = "BIND_SAVECARD";
//只绑定取现 
exports.BIND_DRAWCARD = "BIND_DRAWCARD";
//充值卡取现卡绑定但不一致 
exports.BIND_NOT_SAME_CARD = "BIND_NOT_SAME_CARD";
//充值卡取现卡绑定并一致
exports.BIND_SAME_CARD = "BIND_SAME_CARD";


//天天盈-用户不存在
exports.TTY_NOTEXIST="003";
//天天盈-密码错误
exports.TTY_PWDERROR="070";
//天天盈-是外滩云财富账号非tty账号
exports.TTY_ISBUND_NOTTY="079";