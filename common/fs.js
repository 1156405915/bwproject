var fs = require("fs");
var promise = require('bluebird');
var logger = require('./logger').logger;

//写文件
exports.writeFile = function(filePath, dataBuffer) {
	return new promise(function(resolve, reject) {
		fs.writeFile(filePath, dataBuffer, function(err) {
			if (err) {
				reject(err);
			} else {
				resolve(true);
			}
		});
	})

}

//读文件
exports.readFile=function(path){
	return new promise(function(resolve, reject) {
		fs.readFile(path, 'utf-8', function(err, content) {  
			if (err) {
				reject(err);
			} else {
				resolve(content);
			}
		})
	})
}  

//删除文件
exports.unlink=function(path){
	return new promise(function(resolve, reject) {
		fs.unlink(path,function(err) {  
			if (err) {
				reject(err);
			} else {
				resolve(true);
			}
		})
	})
}  