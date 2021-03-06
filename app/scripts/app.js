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
      .when('/technology', {
        templateUrl: 'views/technology.html',
        controller: 'TechnologyController'
      })
      .when('/unit', {
        templateUrl: 'views/unit.html',
        controller: 'UnitController'
      })
      .otherwise({
        redirectTo: '/name'
      });
  });
