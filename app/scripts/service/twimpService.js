'use strict';

(function(){
  var twimpService = function($http){
    var races;
    var currentRace;
    var player = [];

    $http.get('data/races.json').success(function(data) {
      races = data;
    });


    var setName = function(name){
      player.name = name;
    }

    var setRace = function(id){
      currentRace = id;
    }

    return {
      setName: setName,
      setRace: setRace
    };
  }

  var module = angular.module("twimp3App", []);

  module.factory("twimpService", twimpService);

}());



