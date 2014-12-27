'use strict';

/**
 * @ngdoc function
 * @name twimp3App.controller:NameController
 * @description
 * # NameController
 * Controller of the twimp3App
 */
angular.module('twimp3App')
  .controller('NameController', function ($scope, $location, twimpService) {
    $scope.next = function () {
      twimpService.setName($scope.name);
      $location.path("/race")
    }
  });
