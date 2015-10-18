(function () {
  var HttpInterceptorFactory = function ($window) {

    return {
      'request': function (config) {
        // set every request with x-access-token
        config.headers['x-access-token'] = 
          $window.sessionStorage.getItem('access-token');

        return config;
      }
    };

  }

  angular.module('restifyToken')
         .factory('HttpInterceptorFactory', ['$window', HttpInterceptorFactory]);
})();
