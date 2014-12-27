'use strict';

/**
 * @ngdoc function
 * @name twimp3App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the twimp3App
 */
angular.module('twimp3App')
  .controller('RaceController', function ($scope, twimpService) {
    $scope.races = twimpService.getRaces();
    $scope.player = twimpService.getPlayer();

    $scope.setRace = function(id){
      alert(id);
    }
  });
