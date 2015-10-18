var jwtAuthVerify = (function () {

  var jwt = require('jsonwebtoken')
    , config = require('../../lib/config')
    , User = require('../models/User');

  return {  
    // authenticate entered username and password
    // response with token file
    authenticate: function (req, res, next) {
      
      User.auth(req.body, function (err, user) { 
        if (err) {
          res.json(401, { message: 'Wrong username or password' });
          next();
        } else if (user) {
          var jwtOptions = {
            algorithm: config.jwtOptions.algorithm,
            expiresIn: config.jwtOptions.expiresIn,
            issuer: config.jwtOptions.issuer,
            subject: user.username
          };

          var userInfo = {
            id: user._id,
            admin: user.admin,
            username: user.username,
            email: user.email
          };
          
          // if user correct, async signing process
          // NOTE: must input object literal, so jwt can attach the jwt options
          jwt.sign({ user: userInfo }, config.token_secret, jwtOptions,
              function (token) {
            res.json(200, {
              token: token
            });

            next();
          });
        }
      });
    },

    verify: function (req, res, next) {

      // check header, url params or post params for token
      // token req.body.token always undefined
      var token = req.query.token || req.headers['x-access-token'];

      // if got token
      if (token) {
        var jwtOptions = {
          algorithms: [config.jwtOptions.algorithm],
          issuer: config.jwtOptions.issuer
        };

        // verifies token and check expiry
        jwt.verify(token, config.token_secret, function (err, decoded) {
          if (err) {
            res.json(401, { message: 'Failed to verify token.' });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        // else no token provided
        res.json(401, { message: 'No token provided' });
      }

      next();

    }
  }
})();

module.exports = jwtAuthVerify;
