'use strict';

/**
 * @ngdoc function
 * @name daverastApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the daverastApp
 */
angular.module('daverastApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
