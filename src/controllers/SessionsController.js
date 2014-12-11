appModule.controller('SessionsController', [
  '$scope',
  'sessionService',
  function ($scope, sessionService) {
    sessionService.list().then(function (sessions) {
      $scope.sessions = sessions;
    }, function (error) {
      alert(JSON.stringify(error));
    });
  }
]);
