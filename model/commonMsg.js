'use strict';
//报文体的基类

exports.commonMsg = function() {
	this.setHead=function(headMsg){
		this.headMsg = headMsg;
	}
}

