(function () {
  var UsersController = function ($scope, $location, UsersFactory) {
    $scope.users = [];
    $scope.currentPage = '1';

    // init
    getPageUsers({ pageNum: 0 });

    $scope.changePage = function (options) {
      $scope.currentPage = options.pageNum;
      $scope.moveCursor = options.moveCursor;
      getPageUsers(options);
    };

    function getPageUsers(options) {
      UsersFactory.getAllUsers(options, function (err, data) {
        if (err && err.status === 401) return $location.url('/login');

        $scope.users = data.users;
        $scope.totalPage = data.totalPage;
      });
    }
  };
  
  angular.module('restifyToken')
         .controller('UsersController', 
           ['$scope', '$location', 'UsersFactory', UsersController]);
})();

