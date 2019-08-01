//ssh工具类
var Client = require('ssh2').Client;
var logger = require('./logger').logger;
var promise = require('bluebird');

exports.client;

/** 
 * 描述：连接远程电脑 
 * 参数：server 远程电脑凭证
 */
exports.Connect = function(server) {
	return new promise(function(resolve, reject) {
		this.client = new Client();
		this.client.on("ready", function() {
			logger.debug("*** SSH [" + server.host + "] ready!");
			resolve(true);
		}).on('error', function(err) {
			logger.error("***SSH [" + server.host + "] error!");
			reject(err);
		}).on('end', function() {
			logger.debug("***SSH [" + server.host + "] end!");
			resolve("end");
		}).on('close', function(had_error) {
			logger.debug("***SSH close [" + server.host + "] ");
			resolve("close");
		}).connect(server);
	})
}

/** 
 * 描述：断开远程连接
 */
exports.Disconnect = function(server) {
	return new promise(function(resolve, reject) {
		if (typeof this.client == "object" && typeof this.client.end == "function") {
			this.client.end();
			resolve(true);
		} else {
			reject("***SSH client doesn't existed");
		}
	})

}

/** 
 * 描述：上传文件 
 * 参数：server 远程电脑凭证；localPath 本地路径；remotePath 远程路径
 */
exports.UploadFile = function(localPath, remotePath) {
	return new promise(function(resolve, reject) {
		this.client.sftp(function(err, sftp) {
			if (err) {
				reject("*** SSH connect error!");
			} else {
				sftp.fastPut(localPath, remotePath, function(err, result) {
					client.end();
					logger.info("*** SSH upload success!");
					resolve(true);
				});
			}
		});

	})
}

/** 
 * 描述：浏览目录
 * 参数：path:预浏览的目录
 */
 exports.Readdir = function(path) {
	return new promise(function(resolve, reject) {
		this.client.sftp(function(err, sftp) {
			if (err) {
				reject("*** SSH connect error!");
			} else {
				sftp.readdir(path, function(err, list) {
					client.end();
					console.info(list)
					logger.info("*** SSH readdir ["+path+"]");
					resolve(list);
				});
			}
		});

	})
}
