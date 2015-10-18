var UserController = (function () {
  var User = require('../models/User');

  return {
    /**
     * To list all the available users
     */
    index: function (req, res, next) {
      var options = {
        pageSize: req.params.pageSize || 3,
        pageNum: req.params.pageNum || 0,
        moveCursor: req.params.moveCursor || 0,
        firstId: req.params.firstId || ''
      };

      User.getAllUsers(options, function (err, data) {
        if (err) {
          res.json(404, { message: 'failed to get users' });
        } else if (data) {
          res.json(200, data);
        }

        next();
      });
    },

    /**
     * Create new user
     */
    create: function (req, res, next) {
      User.create(req.body, function (err) {
        if (err) {
          res.json(400, { message: err.message });
        } else {
          res.json(200, { message: 'User created' });
        }

        next();
      });
    }
  };
})();

module.exports = UserController;
