'use strict';

(function () {
  var twimpService = function ($http) {
    var races;
    var currentRace;
    var allTechnologies;
    var availableTechs;
    var acquiredTechs = [];
    var player = [];
    var units;
    var unitReference;


    $http.get('data/races.json').success(function (data) {
      races = data;

      console.table(races);
    });

    $http.get('data/technologies.json').success(function (data) {
      allTechnologies = data;

      console.table(allTechnologies);
    });

    $http.get('data/units.json').success(function (data) {
      units = data;
      $http.get('data/units.json').success(function (data) {
        // Because much simpler than deep-cloning it :)
        unitReference = data;
        console.table(unitReference);
      });
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
          console.info("Adding racial tech: " + JSON.stringify(allTechnologies[i]));
          acquireTech(allTechnologies[i]);
        }
      }

      console.table(result);

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

      console.error("Cannot find race with ID " + id);
    }

    function findTech(id) {
      for (var i = 0; i < races.length; i++) {
        if (allTechnologies[i].id == id) {
          return allTechnologies[i];
        }
      }

      console.error("Cannot find tech with ID "+ id);
      console.table(allTechnologies);
    }

    var setRace = function (id) {
      currentRace = findRace(id);
      availableTechs = allTechnologies.slice(0).filter(function(item){
        if (item.type == "Racial technology"){
          return item.race == id;
        }

        return true;
      });

      determineRacialTechs();
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

    var getAcquiredTechs = function () {
      return acquiredTechs;
    }

    var getAvailableTechs = function () {
      return availableTechs;
    }

    var acquireTechById = function (id) {
      console.info("Acquiring tech " + id);

      var tech = findTech(id);
      acquireTech(tech);
    }

    function acquireTech(tech){
      acquiredTechs.push(tech);
      removeFromAvailableTechs(tech);
      applyTechToUnits(tech);

      console.info("Tech " + tech.name + " with ID " + tech.id + " acquired.");
    }

    function applyTechToUnits(tech) {
      console.info("Applying tech " + tech.name + " to units.");

      if (tech.modifiers != null) {
        for (var i = 0; i < tech.modifiers.length; i++) {
          var unit = findUnit(units, tech.modifiers[i].unit);
          applyModifierToUnit(tech.modifiers[i], unit);
        }
      }
    }

    function applyModifierToUnit(modifier, unit) {
      console.info("Applying modifier to " + JSON.stringify(unit));

      unit.move = unit.move + modifier.movement;
      unit.attack = unit.attack - modifier.attack;

      var referenceUnit = findUnit(unitReference, unit.id);

      unit.changed = (referenceUnit.move != unit.move) || (referenceUnit.attack != unit.attack);

      console.info("Applied modifier, unit now " + JSON.stringify(unit));
    }

    function removeTechFromUnits(tech) {
      console.info("Removing tech " + tech.name + " from units.");
      for (var i = 0; i < tech.modifiers.length; i++) {
        var unit = findUnit(units, tech.modifiers[i].unit);
        removeModifierFromUnit(tech.modifiers[i], unit);
      }
    }

    function removeModifierFromUnit(modifier, unit) {
      console.info("Removing modifier from " + JSON.stringify(unit));

      unit.move = unit.move - modifier.movement;
      unit.attack = unit.attack + modifier.attack;

      var referenceUnit = findUnit(unitReference, unit.id);
      unit.changed = (referenceUnit.move != unit.move) || (referenceUnit.attack != unit.attack);

      console.info("Removed modifier, unit now " + JSON.stringify(unit));
    }

    function findUnit(haystack, unitId) {
      for (var i = 0; i < haystack.length; i++) {
        if (haystack[i].id == unitId) {
          return haystack[i];
        }
      }
    }

    var unAcquireTech = function (id) {
      console.log("Removing tech with ID " + id);

      var tech = findTech(id);
      var index = acquiredTechs.indexOf(tech);

      acquiredTechs.splice(index, 1);
      availableTechs.push(tech);

      removeTechFromUnits(tech);
    }

    function removeFromAvailableTechs(tech) {
      var index = availableTechs.indexOf(tech);
      availableTechs.splice(index, 1);
    }

    var getUnits = function () {
      return units;
    }

    return {
      setName: setName,
      setRace: setRace,
      getPlayer: getPlayer,
      getRaces: getRaces,
      getCurrentRace: getCurrentRace,
      getAcquiredTechs: getAcquiredTechs,
      getAvailableTechs: getAvailableTechs,
      acquireTech: acquireTechById,
      unAcquireTech: unAcquireTech,
      getUnits: getUnits
    };
  }

  var module = angular.module("twimp3App");

  module.factory("twimpService", twimpService);

}());



