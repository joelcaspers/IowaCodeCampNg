appModule.factory('sessionResource', [
  '$resource',
  function ($resource) {
    return $resource(
      'http://localhost:8081/api/sessions/:sessionId',
      {sessionId: '@Id'},
      {
        update: { method: 'PUT' },
        create: { method: 'POST' }
      }
    );
  }
]);

appModule.factory('sessionService', [
  'sessionResource',
  '$q',
  function (sessionResource, $q) {

    function list () {
      var deferred = $q.defer();
      sessionResource.query(function (sessions) {
        deferred.resolve(sessions);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    return {
      list: list
    };
  }
]);
