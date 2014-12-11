appModule.controller('SessionsController', [
  '$scope',
  'sessionService',
  function ($scope, sessionService) {
    $scope.sessionsTitle = 'Iowa Code Camp - Sessions';

    sessionService.list().then(function (sessions) {
      alert('returned ' + sessions.length + ' sessions');
    }, function (error) {
      alert(JSON.stringify(error));
    });
  }
]);
