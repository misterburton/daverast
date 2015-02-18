'use strict';

/**
 * @ngdoc function
 * @name daverastApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the daverastApp
 */
app.controller('MainCtrl', function($scope, tabletopData) {

  // fire random colors funciton from app.js
  randomColors();

  $scope.data = tabletopData;
  $scope.tracks = $scope.data[0].Tracks.elements;

  // when leaving this view …
  $scope.$on('$locationChangeStart', function(event) {
    // set iFrame sources to ''
  });

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
          TweenMax.to(trackIFrame, .25, {autoAlpha:1});
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

// JSON format, for reference
// $scope.tracks = [
//   {
//     'name': 'Ornery Little Darlings: Blueberry Hill (Dave Ruin Remix)',
//     'url': 'https://w.soundcloud.com/player…
//     'width': '100%',
//     'height': '300'
//   }
// ];