'use strict';
const restify = require('restify');  
const log = require('./src/common/sgLog');
const config = require('./src/config/get-config');
const util = require('./src/common/util');
const server = restify.createServer({
  name    : config.name,
  version : config.version,
  log: log
});

require('./src/libs/mongoose-connect');

//middlewares
//Note: bodyParser() takes care of turning your request data into a JavaScript object on the server automatically.
server.use(restify.bodyParser());

//Parses the HTTP query string (i.e., /foo?id=bar&name=mark). If you use this, the parsed content will always be available in req.query, additionally params are merged into req.params.
server.use(restify.queryParser());
//Parses out the Accept header, and ensures that the server can respond to what the client asked for. You almost always want to just pass in server.acceptable here, as that's an array of content types the server knows how to respond to (with the formatters you've registered). If the request is for a non-handled type, this plugin will return an error of 406.
server.use(restify.acceptParser(server.acceptable));


//server.on('after', restify.auditLogger({log: log}));
server.on('after', function(req, res, route, error){
   //console.log(require('util').inspect(res._body));
  let body = res._body;
  log.info({req: req, res: res, code: body.Code});
});

let wrapResult = require('./src/common/wrapResult');
server.get('/', function(req,res,next){
  console.log('enteringinto frontpage');
  res.json(wrapResult('HOME PAGE'));
  next();
});


/**
 * Error Handling
 */
require('./src/common/promiseErrorHandling').rejectHandling();
/*jslint unparam:true*/
// Default error handler. Personalize according to your needs.
server.on('uncaughtException', function (req, res, route, err) {
  
  util.errorProcess(req, res, err);
});
/*jslint unparam:false*/
server.listen(config.port, function() {
  console.log('%s listening at %s', server.name, server.url);
});