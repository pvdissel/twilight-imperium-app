'use strict';

/**
 * @ngdoc function
 * @name twimp3App.controller:NameController
 * @description
 * # NameController
 * Controller of the twimp3App
 */
angular.module('twimp3App')
  .controller('UnitController', function ($scope, $location, twimpService) {
    $scope.currentRace = twimpService.getCurrentRace();
    $scope.player = twimpService.getPlayer();
    $scope.units = twimpService.getUnits();

  });
