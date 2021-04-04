appModule.factory('sessionResource', [
  '$resource',
  'API_ENDPOINT_URI_ROOT',
  function ($resource, API_ENDPOINT_URI_ROOT) {
    return $resource(
      API_ENDPOINT_URI_ROOT + 'papi/iowacodecamp/v1/sessions/:sessionId',
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
