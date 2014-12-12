var appModule = angular.module('IowaCodeCampNg', ['ngResource', 'ui.router']);

appModule.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('session', {
    url: '/session/list',
    templateUrl: 'sessions.html',
    controller: 'SessionsController',
    onEnter: function () {
      $("#sessions").removeClass().addClass("active");
    }
  }).state('/', {
    url: '/',
    templateUrl: 'splash.html',
    controller: 'SplashController',
    onEnter: function () {
      $("#sessions").removeClass();
    }
  });
}]);
