'use strict';

(function () {
  var twimpService = function ($http) {
    var races;
    var currentRace;
    var allTechnologies;
    var racialTechs;
    var acquiredTechs;
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

    var isInArray = function(needle, haystack){
      for (var i = 0;i < haystack.length;i++){
        if (haystack[i] == needle){
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

    var getRacialTechs = function(){
      return racialTechs;
    }

    return {
      setName: setName,
      setRace: setRace,
      getPlayer: getPlayer,
      getRaces: getRaces,
      getCurrentRace: getCurrentRace,
      getRacialTechs: getRacialTechs
    };
  }

  var module = angular.module("twimp3App");

  module.factory("twimpService", twimpService);

}());



