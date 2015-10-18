(function () {
  var LoginController = function ($scope, $window, $location, UsersFactory) {
    $scope.errorMsg = '';

    // submit the username and password
    $scope.submit = function (user) {

      // check if blank input
      if (user && user.username && user.password) {
        UsersFactory.authUser(user, function (err, response) {
          if (err) return $scope.errorMsg = 'Wrong username or password.';

          $window.sessionStorage.setItem('access-token', response.data.token);
          $location.url('/users');
        });
      } else {
        return $scope.errorMsg = 'Please do not leave blank.';
      }
    };
  };

  angular.module('restifyToken')
         .controller('LoginController',
            ['$scope', '$window', '$location', 'UsersFactory', LoginController]);
})();
