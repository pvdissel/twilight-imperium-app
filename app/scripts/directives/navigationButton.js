'use strict';

(function () {


  var navigateButton = function ($location) {
    return function (scope, element, attrs) {
      var path;

      attrs.$observe('navigateTo', function (val) {
        path = val;
      });

      element.bind('click', function () {
        scope.$apply(function () {
          $location.path(path);
        });
      });
    };
  }
  var module = angular.module("twimp3App");

  module.directive("navigateTo", navigateButton);

}()
)
;



