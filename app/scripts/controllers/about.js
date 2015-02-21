'use strict';

/**
 * @ngdoc function
 * @name daverastApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the daverastApp
 */
app.controller('AboutCtrl', function($scope, tabletopData) {

  $scope.data = tabletopData;
  $scope.tracks = $scope.data[0].J4F.elements;

  // store path to website copy
  var copy = $scope.data[0].WebsiteCopy.elements[0];
  // set copy vars for the view
  $scope.aboutHeadline = copy.aboutHeadline;
  $scope.aboutCopy = copy.aboutCopy;

  // console.log('data: ', $scope.data[0].Tracks.elements);

  // fire random colors & init header funcitons from app.js
  randomColors();
  initHeader(copy);

});

// dynamically set iframe 'src' attributes when .track elements are added w/ a 1s delay
app.directive('trackElement', ['$timeout', function(timer) {
  return {
    link: function($scope, $elem, $attrs, $index) {

      var setIFrameSource = function() {
        // make iframe element invisible
        var trackIFrame = $elem.find('.frame');

        // fire fade in callback when iframe is loaded
        trackIFrame.ready(function() {
          trackIFrame.css('opacity', 0);
          TweenMax.to(trackIFrame, .25, {
            autoAlpha: 1
          });
        });

        // set iframe `src` attritube via $scope.tracks array
        trackIFrame.attr('src', $scope.tracks[$attrs.id].url);
      }

      // wait for page transition before setting iframe `src` attributes
      // this works even with a delay of 0s / i.e. when added to DOM
      timer(setIFrameSource, 666);
    }
  }
}]);