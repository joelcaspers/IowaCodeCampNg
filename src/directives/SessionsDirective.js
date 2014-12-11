appModule.directive('sessions', function ($scope) {
    return {
      restrict: 'E',
      templateUrl: 'sessions.html',
      controller: 'SessionsController'
    };
  }
);
