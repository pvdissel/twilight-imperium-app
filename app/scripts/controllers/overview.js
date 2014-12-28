'use strict';

/**
 * @ngdoc function
 * @name twimp3App.controller:NameController
 * @description
 * # NameController
 * Controller of the twimp3App
 */
angular.module('twimp3App')
  .controller('OverviewController', function ($scope, $location, twimpService) {
    $scope.currentRace = twimpService.getCurrentRace();
    $scope.player = twimpService.getPlayer();
    $scope.startingTechs = twimpService.getStartingTechs();
    $scope.acquiredTechs = twimpService.getAcquiredTechs();
    $scope.availableTechs = twimpService.getAvailableTechs();

    $scope.add = function(id){
      twimpService.acquireTech(id);
    }

    $scope.remove = function(id){
      twimpService.unAcquireTech(id);
    }
  });
