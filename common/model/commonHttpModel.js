var config = require('../config');

// 公共请求头部
exports.headMsgModel =function() {
	//渠道编号
	this.branCode=config.bran_code; 
	//发起时间
	var frontTime;
	//请求ip
	var ip;       
	/*操作人员*/
	var operator; 
	/*系统编号*/
	this.srcCode=config.head_src_code; 
	/*暂时不用*/
	var txnCode;
	/*restful地址*/
	var restful;
	//版本
	this.version=config.head_version;  
	//应答码
	var respCode; 
	//应答消息
	var respMsg;  
	//该接口超时时间
	var timeOut;  
	//平台类型
	this.pfType=config.pfType;
	//请求流水号
	var outreqSeqId;


	this.setBranCode=function(branCode){
		this.branCode=branCode;		
	}
	this.getBranCode=function(){
		return this.branCode;
	}
	this.setFrontTime=function(frontTime){
		this.frontTime=frontTime;		
	}
	this.setIp=function(ip){
		this.ip=ip;		
	}
	this.setOperator=function(operator){
		this.operator=operator;		
	}
	this.setSrcCode=function(srcCode){
		this.srcCode=srcCode;		
	}
	this.setTxnCode=function(txnCode){
		this.txnCode=txnCode;		
	}
	this.setVersion=function(version){
		this.version=version;		
	}	
	this.setTimeOut=function(timeOut){
		this.timeOut=timeOut;		
	}	
	this.setPfType=function(pfType){
		this.pfType=pfType;		
	}
	this.setOutreqSeqId=function(outreqSeqId){
		this.outreqSeqId=outreqSeqId;		
	}
	this.setRestful=function(restful){
		this.restful=restful;		
	}
	this.getRestful=function(outreqSeqId){
		return this.restful;	
	}
	
}

// 公共请求
exports.commonReq =function(reqMsg,branCode) {	
	this.reqMsg = reqMsg;
	this.branCode=branCode;
};

// 公共应答
exports.commonRsp =function() {
	function rspHeadMsgModel(){
		var rspCode;
		var rspDesc;
	}
	var rspHeadMsg =new rspHeadMsgModel();
	var rspBodyMsg;

	this.setRspBody=function(body){
		this.rspBodyMsg=body;
	}
	this.setRspHead=function(rspCode,rspDesc){
		rspHeadMsg.rspCode=rspCode;
		rspHeadMsg.rspDesc=rspDesc;		
		this.rspHeadMsg=rspHeadMsg;
	}
	this.getRspHead=function(){
		return this.rspHeadMsg;		
	}
	this.getRspBody=function(){
		return this.rspBodyMsg;
	}
};
