'use strict';

(function () {
  var twimpService = function ($http) {
    var races;
    var currentRace;
    var allTechnologies;
    var availableTechs;
    var racialTechs;
    var acquiredTechs = [];
    var player = [];
    var units;


    $http.get('data/races.json').success(function (data) {
      races = data;
    });

    $http.get('data/technologies.json').success(function (data) {
      allTechnologies = data;
    });

    $http.get('data/units.json').success(function (data) {
      units = data;
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
      availableTechs = allTechnologies.slice(0);

      removeRacialFromAvailableTechs(racialTechs);
    }

    function removeRacialFromAvailableTechs(racialTechs) {
      for (var i = 0; i < racialTechs.length; i++) {
        removeFromAvailableTechs(racialTechs[i]);
      }
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

    var getAvailableTechs = function () {
      return availableTechs;
    }

    var acquireTech = function (id) {
      var tech = findTech(id);
      acquiredTechs.push(tech);
      removeFromAvailableTechs(tech);
    }

    var unAcquireTech = function (id) {
      var tech = findTech(id);
      var index = acquiredTechs.indexOf(tech);

      acquiredTechs.splice(index, 1);
      availableTechs.push(tech);
    }

    function removeFromAvailableTechs(tech) {
      var index = availableTechs.indexOf(tech);
      availableTechs.splice(index, 1);
    }

    var getUnits = function(){
      return units;
    }

    return {
      setName: setName,
      setRace: setRace,
      getPlayer: getPlayer,
      getRaces: getRaces,
      getCurrentRace: getCurrentRace,
      getStartingTechs: getStartingTechs,
      getAcquiredTechs: getAcquiredTechs,
      getAvailableTechs: getAvailableTechs,
      acquireTech: acquireTech,
      unAcquireTech: unAcquireTech,
      getUnits:getUnits
    };
  }

  var module = angular.module("twimp3App");

  module.factory("twimpService", twimpService);

}());



