var User = (function () {
  var saltHash = require('../../lib/saltHash')
    , config = require('../../lib/config')
    , mongoose = require('../../lib/mongoosedb').getMongooseInstance()
    , Schema = mongoose.Schema
    , UserSchema = new Schema({
        email: { type: String, 
                 set: toLower, 
                 trim: true, 
                 required: true, 
                 unique: true 
        },
        username: { type: String, 
                    set: toLower, 
                    trim: true, 
                    required: true, 
                    unique: true 
        },
        salt: String,
        hashed_password: String,
        admin: Boolean
      })
    , User = mongoose.model('User', UserSchema);

  UserSchema.pre('save', function (next) {
    var hashObj = saltHash.hashPassword(this.hashed_password);

    if (hashObj) {
      this.hashed_password = hashObj.hashed_password;
      this.salt = hashObj.salt;
    }

    next();
  });

  return {
    /**
     * asyncly get all users from db
     * @cb: is callback return all users data with success state
     */
    getAllUsers: function (options, callback) {
      changePage(options, function (err, user) {
        return callback(err, user);
      });
      // User.find({}, function (err, users) {
      //   return callback(err, users);
      // });
    },
    
    /** 
     * asyncly get only the one matched user
     * @fields: string of field names which want to be returned *Optional
     * @callback: callback return user object
     */
    getUser: function (name, fields, callback) {
      // to check if second params is function
      if (typeof fields === 'function') {
        User.findOne({ name: name },
            function (err, user) {
          if (err) throw err;

          return fields(user);
        });
      } else {
        User.findOne({ name: name }, fields,
            function (err, user) {
          if (err) throw err;

          return callback(user);
        });
      }
    },

    /**
     * create new user
     * @body: json of username, email, password
     * @callback return err, user
     */
    create: function (body, callback) {
      if (!body.email) 
        return callback(new Error('email should not be empty.'));

      if (!body.username) 
        return callback(new Error('username should not be empty.'));

      if (!body.password) 
        return callback(new Error('password should not be empty.'));

      var user = new User({
        email: body.email,
        username: body.username,
        hashed_password: body.password, // temporary save the plaintext password
        admin: body.admin || false
      });

      user.save(function (err) {
        if (err) return callback(err);

        return callback(null);
      });
    },

    /**
     * auth user
     */
    auth: function (body, callback) {
      var query = User.find({ username: body.username }).limit(1);
      query.find(function (err, users) {
        // Internal error
        if (err) return callback(new Error('Database error'));

        // No user found
        if (users.length < 1) return callback(new Error('user not found'));

        var user = users[0];

        if (saltHash.compareHash(user, body.password)) {
          return callback(null, user);
        } else {
          return callback(new Error('wrong password'));
        }
      });
    }
  };

  function toLower(str) {
    if (str) return str.toLowerCase();
  }

  function changePage(options, callback) {
    getUsersCount(options, function (options) {
      getCurrentPageFirstUserId(options, function (err, user) {
        return callback(err, user);
      });
    });
  };

  function getUsersCount(options, callback) {
    User.count(function (err, count) {
      options.totalPage = Math.ceil(count/options.pageSize);
      return callback(options);
    });
  };

  function getCurrentPageFirstUserId(options, callback) {
    var queryOptions = {};
    var paginateOptions = {};
    var displayFields = 'username email';

    // configure query options
    if (options.firstId) {
      if (options.moveCursor > -1) {
        queryOptions._id = { $gte: options.firstId };
        paginateOptions.skip = parseInt(options.moveCursor) * options.pageSize;
      } else {
        queryOptions._id = { $lt: options.firstId };
        paginateOptions.skip = (parseInt(options.pageNum) - 1) * options.pageSize;
      }
    } else {
      paginateOptions.skip = parseInt(options.moveCursor) * options.pageSize;
    }

    paginateOptions.limit = options.pageSize;
    paginateOptions.sort = { _id: 1 };
    // end of configure query options

    var data = { totalPage: options.totalPage };

    User.find(queryOptions, displayFields, paginateOptions, function (err, users) {
      data.users = users;
      return callback(err, data);
    });
  };

})();

module.exports = User;
