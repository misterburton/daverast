'use strict';

/**
 * @ngdoc function
 * @name daverastApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the daverastApp
 */
app.controller('MainCtrl', function($scope, tabletopData) {
  // store path to website data
  $scope.data = tabletopData;

  // make 'Home' data available to the view
  $scope.homeVars = $scope.data[0].Home.elements[0];

  // grab copy vars for dynamic header text
  var copy = $scope.data[0].WebsiteCopy.elements[0];

  randomColors();
  initHeader(copy);
});