'use strict';

/**
 * @ngdoc function
 * @name daverastApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the daverastApp
 */
angular.module('daverastApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
