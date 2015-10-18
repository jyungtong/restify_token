(function () {
  var app = angular.module('restifyToken', ['ngRoute']);

  app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'public/app/views/click.html'
      })
      .when('/users', {
        controller: 'UsersController',
        templateUrl: 'public/app/views/users.html'
      })
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'public/app/views/login.html'
      })
      .otherwise({ redirectTo: '/' });

    $httpProvider.interceptors.push('HttpInterceptorFactory');
  });

})();
