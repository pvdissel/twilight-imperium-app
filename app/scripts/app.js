'use strict';

/**
 * @ngdoc overview
 * @name twimp3App
 * @description
 * # twimp3App
 *
 * Main module of the application.
 */
angular
  .module('twimp3App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/name', {
        templateUrl: 'views/name.html',
        controller: 'NameController'
      })
      .when('/race', {
        templateUrl: 'views/race.html',
        controller: 'RaceController'
      })
      .when('/overview', {
        templateUrl: 'views/overview.html',
        controller: 'OverviewController'
      })
      .otherwise({
        redirectTo: '/name'
      });
  });
