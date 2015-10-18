(function () {
  
  var PageNumberDirective = function ($compile) {
    var firstId = '';
    var clickedPage = 0;

    return {
      restrict: 'E',
      transclude: true,
      scope: {
        page: '@',
        users: '=',
        pageAction: '&'
      },
      link: linker,
      controller: directiveController
    };

    function directiveController($scope) {
      $scope.changePage = function (num) {
        var distance = num - clickedPage;
        // var moveCursor = (distance > -1) ? distance - 1 : distance - 1;
        var moveCursor = distance - 1;

        var options = {
          pageNum: num,
          moveCursor: moveCursor,
          firstId: firstId
        };
        
        $scope.pageAction()(options);

        // set the last clicked page
        clickedPage = num - 1;
      };
    }

    function linker(scope, element, attrs) {

      scope.$watch('users', function () {
        if (scope.users[0])
          firstId = scope.users[0]._id;
      });

      scope.$watch('page', function () {
        // rendering pages number dynamically based on server given total pages
        var template = '<div>';
        for(var i = 0; i < scope.page; i++) {
          var pageNum = i + 1;
          template += '<a href="" ng-click="changePage(' + pageNum + ')">';
          // template += '<a href="" ng-click="test()">';
          template += 'Page ' + pageNum;
          template += '</a> | ';
        }
        template += '</div>';

        if (scope.page) {
          element.append($compile(template)(scope));
        }
      });
    };
  };

  angular.module('restifyToken')
         .directive('pageNumber', ['$compile', PageNumberDirective]);
})();
