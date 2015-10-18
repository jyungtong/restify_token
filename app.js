var config = require('./lib/config')
  , mongooseDb = require('./lib/mongoosedb')
  , routes = require('./server/routes')
  // , morgan = require('morgan')
  , restify = require('restify')
  , server = restify.createServer({ name: 'restify_token' });

// server.use(morgan('combined'));

// using restify middleware
server.use(restify.acceptParser(server.acceptable));
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.bodyParser(config.bodyParser));

// init mongodb
// mongooseDb.init();

// init routes
routes.init(restify, server);

server.listen(config.port);
console.log('Server listening at port: ' + config.port);
