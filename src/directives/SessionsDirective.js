appModule.directive('sessions', function () {
    return {
      restrict: 'E',
      templateUrl: 'sessions.html',
      controller: 'SessionsController'
    };
  }
);
