'use strict';

(function(){
  var twimpService = function($http){
    var races;
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
      currentRace = id;
    }

    var getRaces = function(){
      return races;
    }

    return {
      setName: setName,
      setRace: setRace,
      getPlayer:getPlayer,
      getRaces:getRaces

    };
  }

  var module = angular.module("twimp3App");

  module.factory("twimpService", twimpService);

}());



