'use strict';
const restify = require('restify');  
const config = require('./src/config/get-config');
const server = restify.createServer({
  name    : config.name,
  version : config.version	
	//log:
});

require('./src/libs/mongoose-connect');

//middlewares
//Note: bodyParser() takes care of turning your request data into a JavaScript object on the server automatically.
server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.queryParser({ mapParams: true }));

server.get('/', function(req,res,next){
  console.log('enteringinto frontpage');
  res.send('frontpage');
  next();
});
server.get('/about', function(req,res,next){
  console.log('entering into about');
  res.send('frontpage about page');
  next();
});


/**
 * Error Handling
 */
server.on('uncaughtException', (req, res, route, err) => {
  console.error(err.stack);
  res.json(err);
});


server.listen(config.port, function() {
  console.log('%s listening at %s', server.name, server.url);
});