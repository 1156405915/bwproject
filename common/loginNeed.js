var config = require('./config');

// 需要登录拦截的路径


exports.loginNeedMapping=function(){	
	var loginNeed = [
		// 用户资产
		"/service/myProperty"
	];

	var project_test_name=config.project_test_name;
	var project_product_name=config.project_product_name;
	var project_stage_name=config.project_stage_name;

	var loginNeedUrl=new Array();
	for(var i=0;i<loginNeed.length;i++){
		loginNeedUrl.push(project_test_name+loginNeed[i]);
		loginNeedUrl.push(project_product_name+loginNeed[i]);
		loginNeedUrl.push(project_stage_name+loginNeed[i]);
	}
	return loginNeedUrl;
}

// console.info(this.loginNeedMapping());
// console.info(this.loginNeed.length);