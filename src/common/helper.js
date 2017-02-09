'use strict';
const serverName = require('os').hostname();
const cluster = require('cluster');

exports.wrapError = function (err, code) {
  if (!err || !['RouteError', 'ServiceError'].includes(err.constructor.name)) {
    err = new Error('服务器出错了!');
  }

  return {
    Code: err.code || code || -20000,
    Message: err.message || '操作失败',
    Result: {}
  };
};
exports.errorProcess = function (req, res, err, code) {
//   req.log.error({
//     code: err.code || code || -20000,
//     req: req,
//     res: res,
//     err: err,
//     serverName: serverName,
//     cluster: cluster.worker && cluster.worker.id
//   });
  let log = require('./sgLog');
  log.error({code: err.code || code || -20000, req: req,err: err});
  res.json(exports.wrapError(err, err.code || code));
};