var routes = (function () {
  var jwtAuthVerify = require('./middleware/jwtAuthVerify')
    , userCtrl = require('./controllers/userController');

  return {
    init: function(restify, server) {
      // GET /api
      // server.get('/api', function (req, res, next) {
      //   res.json({ success: true });
      //   next();
      // });
      
      // POST /api/authenticate
      server.post('/api/authenticate', jwtAuthVerify.authenticate);

      // GET /api/users list all users
      server.get('/api/users', jwtAuthVerify.verify, userCtrl.index);
      // server.get('/api/users', userCtrl.index);

      // POST /api/users create a user
      server.post('/api/users', userCtrl.create);

      // match the path '/'
      server.get(/\//, restify.serveStatic({
        directory: './client/',
        default: 'index.html'
      }));
    }
  };

})();

module.exports = routes;
