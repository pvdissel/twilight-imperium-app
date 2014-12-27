'use strict';

(function(){
  var twimpService = function($http){
    var races;
    var currentRaceId;
    var currentRace;
    var player = [];


    $http.get('data/races.json').success(function(data) {
      races = data;
    });

    var getPlayer = function(){
      return player;
    }

    var setName = function(name){
      player.name = name;
    }

    var setRace = function(id){
      currentRaceId = id;

      for (var i = 0 ; i< races.length;i++){
        if (races[i].id == currentRaceId){
          currentRace = races[i];
          break;
        }
      }
    }

    var getCurrentRace = function(){
      return currentRace;
    }

    var getRaces = function(){
      return races;
    }

    return {
      setName: setName,
      setRace: setRace,
      getPlayer:getPlayer,
      getRaces:getRaces,
      getCurrentRace:getCurrentRace
    };
  }

  var module = angular.module("twimp3App");

  module.factory("twimpService", twimpService);

}());



