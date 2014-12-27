'use strict';

(function () {
  var twimpService = function ($http) {
    var races;
    var currentRace;
    var allTechnologies;
    var racialTechs;
    var acquiredTechs = [];
    var player = [];


    $http.get('data/races.json').success(function (data) {
      races = data;
    });

    $http.get('data/technologies.json').success(function (data) {
      allTechnologies = data;
    });

    var getPlayer = function () {
      return player;
    }

    var setName = function (name) {
      player.name = name;
    }

    function determineRacialTechs() {
      var result = [];
      for (var i = 0; i < allTechnologies.length; i++) {
        if (isInArray(allTechnologies[i].id, currentRace.startingTechs)) {
          result.push(allTechnologies[i]);
        }
      }

      return result;
    }

    var isInArray = function (needle, haystack) {
      for (var i = 0; i < haystack.length; i++) {
        if (haystack[i] == needle) {
          return true;
        }
      }

      return false;
    }

    function findRace(id) {
      for (var i = 0; i < races.length; i++) {
        if (races[i].id == id) {
          return races[i];
        }
      }
    }

    function findTech(id) {
      for (var i = 0; i < races.length; i++) {
        if (allTechnologies[i].id == id) {
          return allTechnologies[i];
        }
      }
    }

    var setRace = function (id) {
      currentRace = findRace(id);
      racialTechs = determineRacialTechs();
    }

    var getCurrentRace = function () {
      return currentRace;
    }

    var getRaces = function () {
      return races;
    }

    var getStartingTechs = function () {
      return racialTechs;
    }

    var getAcquiredTechs = function () {
      return acquiredTechs;
    }

    var getAllTechs = function () {
      return allTechnologies;
    }

    var acquireTech = function (id) {
      acquiredTechs.push(findTech(id));
    }

    return {
      setName: setName,
      setRace: setRace,
      getPlayer: getPlayer,
      getRaces: getRaces,
      getCurrentRace: getCurrentRace,
      getStartingTechs: getStartingTechs,
      getAcquiredTechs: getAcquiredTechs,
      getAllTechs: getAllTechs,
      acquireTech:acquireTech
    };
  }

  var module = angular.module("twimp3App");

  module.factory("twimpService", twimpService);

}());



