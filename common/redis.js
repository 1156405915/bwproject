var logger = require('./logger').logger;
var redis = require('ioredis');
var config = require('./config');
var promise = require('bluebird');
//redis
//var client = redis.createClient(config.redisPort, config.reidsIp);

//redis集群
//在redis中保存key-value,value为哈希集合
exports.mset = function(key, value) {
    return new promise(function(resolve, reject) {
        var str = JSON.stringify(value);
        var cluster = new redis.Cluster(config.redisCluster);
        cluster.mset(key, str, function(err) {
            if (err) {
                logger.error("***RedisCluster [mset] Failed!:" + err);
                reject(config.redis_failed);
            } else {
                resolve(true);
            }
            cluster.disconnect();
        });
    })
}

//从key值中获取field字段的值
exports.get = function(key) {
    return new promise(function(resolve, reject) {
        var cluster = new redis.Cluster(config.redisCluster);
        cluster.get(key, function(err, object) {
            if (err) {
                logger.error("***RedisCluster [get] Failed!:" + err);
                reject(config.redis_failed);
            } else {
                resolve(object);
            }
            cluster.disconnect();
        });
    })
}

//设置或更新key的过期时间time,单位s
exports.expire = function(key, time) {
    return new promise(function(resolve, reject) {
        var cluster = new redis.Cluster(config.redisCluster);
        cluster.expire(key, time, function(err) {
            if (err) {
                logger.error("***RedisCluster [expire] Failed!:" + err);
                reject(config.redis_failed);
            } else {
                resolve(true);
            }
            cluster.disconnect();
        });
    })
}

//删除Key的数据
exports.del = function(key) {
    return new promise(function(resolve, reject) {
        var cluster = new redis.Cluster(config.redisCluster);
        cluster.del(key, function(err) {
            if (err) {
                logger.error("***RedisCluster [del] Failed!:" + err);
                reject(config.redis_failed);
            } else {
                resolve(true);
            }
            cluster.disconnect();
        });
    })
}

//查看redis中的超时时间
exports.ttl = function(key) {
    return new promise(function(resolve, reject) {
        var cluster = new redis.Cluster(config.redisCluster);
        cluster.ttl(key, function(err, object) {
            if (err) {
                logger.error("***RedisCluster [ttl] Failed!:" + err);
                reject(config.redis_failed);
            } else {
                resolve(object);
            }
            cluster.disconnect();
        });
    })
}

//将一个或多个成员元素及其分数值加入到有序集当中
exports.zadd = function(key, value1, value2) {
    return new promise(function(resolve, reject) {
        var cluster = new redis.Cluster(config.redisCluster);
        cluster.zadd(key, value1, value2, function(err, object) {
            if (err) {
                logger.error("***RedisCluster [zadd] Failed!:" + err);
                reject(config.redis_failed);
            } else {
                resolve(object);
            }
            cluster.disconnect();
        });
    })
}

// 返回有序集中指定分数区间内的所有的成员
//timeflag:'+inf' / '-inf'
exports.zrevrangebyscore = function(key, timeflag, ago) {
    return new promise(function(resolve, reject) {
        var cluster = new redis.Cluster(config.redisCluster);
        cluster.zrevrangebyscore(key, timeflag, ago, function(err, object) {
            if (err) {
                logger.error("***RedisCluster [zrevrangebyscore] Failed!:" + err);
                reject(config.redis_failed);
            } else {
                resolve(object);
            }
            cluster.disconnect();
        });
    })
}


// var cluster = new redis.Cluster(config.redisClusterTest);
// cluster.mset("NsessionID", '{"loginName":"4234234","tokenTimeOut":"3424234"}');
// cluster.expire("NsessionID",600);


// cluster.ttl('QcFuzQzWw60ax1yDZFmR91T6XVakQaqW', function (err, res) {
//   // res === 'bar'
//   console.info(res);
// });
//
// cluster.zadd('online',Date.now(), "user",function (err, res) {
//   // res === 'bar'
//   console.info(res);
// });

// var min = 60 * 1000;
// var ago = Date.now() - min;
// cluster.zrevrangebyscore('online','+inf', ago,function(err, res) {
// 	console.info(res);
// });