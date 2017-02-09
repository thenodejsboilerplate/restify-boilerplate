/**
 * Created by lenovo on 2016/3/30.
 */
const bunyan = require('bunyan');
const SpecificLevelStream = require('./specialLevelStream');
const fs = require('fs');
const {mkdirRecursion} = require('./fileSystem');
const {dirname, resolve} = require('path');

function headersFilter(headers){
  return {
    host: headers.host,
    connection: headers.connection,
    accept: headers.accept
  };
}
function reqSerializer(req) {
  return {
    method: req.method,
    url: req.url,
    headers: headersFilter(req.headers),
    params: req.params
  };
}
function resSerializer(res) {
  return res._body;
}
function errSerializer(err) {
  return {
    message: err.message,
    stack: err.stack
  };
}
function codeSerializer(code){
  return code;
}

// console.log(`process.mainModule.filename: ${dirname(process.mainModule.filename)}`);
let bunyanDir = `${dirname(process.mainModule.filename)}/bunyan`;
// mkdirRecursion(bunyanDir);

var log2 = bunyan.createLogger({
  name: 'api',
  streams: [ {
    level: 'info',
    type: 'raw',
    stream: new SpecificLevelStream(
            ['info'],
            fs.createWriteStream(`${bunyanDir}/saas-info.log`,
                {flags: 'a', encoding: 'utf8'}))
  }, {
    level: 'error',
    path: `${bunyanDir}/saas-err.log`
  } ],
  serializers: {
    req: reqSerializer,
    res: resSerializer,
    err: errSerializer,
    code: codeSerializer
  }

});

module.exports = log2;
// log2.info('200 GET /blah');
// log2.error('500 GET /boom');
// module.exports = bunyan.createLogger({
//   name: 'FgSAAS',
//   streams: [
//     {
//       level: 'info',
//       path: `${bunyanDir}/saas-info.log`
//     },
//     {
//       path: `${bunyanDir}/saas-err.log`,
//       level: 'error'
//     }],
//   serializers: {
//     req: reqSerializer,
//     res: resSerializer,
//     err: errSerializer,
//     code: codeSerializer
//   }
// });
