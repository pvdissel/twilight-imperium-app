'use strict';

/**
 * @ngdoc function
 * @name twimp3App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the twimp3App
 */
angular.module('twimp3App')
  .controller('RaceController', function ($scope, $http) {
    $http.get('data/races.json').success(function(data) {
      $scope.races = data;
    });

    $scope.setRace = function(id){
      alert(id);
    }
  });
