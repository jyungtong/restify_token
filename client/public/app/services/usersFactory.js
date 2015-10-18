(function () {

  var UsersFactory = function ($http) {
    return {

      getAllUsers: function (options, callback) {
        var url = '/api/users';
        url += '?pageNum=' + options.pageNum;

        if (options.moveCursor)
          url += '&moveCursor=' + options.moveCursor;

        if (options.firstId)
          url += '&firstId=' + options.firstId;

        // first is successCallback, second is errorCallback
        $http({
          method: 'GET',
          url: url,
          responseType: 'json'
        }).then(function (users) {
          return callback(null, users.data);
        }, function (err) {
          return callback(err);
        });

      },

      // authenticate user with username and password
      // RETURN token
      authUser: function (user, callback) {
        
        // first successCallback, second errorCallback
        $http.post('/api/authenticate', user).then(function (token) {
          return callback(null, token);
        }, function (err) {
          return callback(new Error('Unable to auth'));
        });

      }

    };
  };

  angular.module('restifyToken')
         .factory('UsersFactory', ['$http', UsersFactory]);
})();
