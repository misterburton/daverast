'use strict';

/**
 * @ngdoc function
 * @name daverastApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the daverastApp
 */
app.controller('AboutCtrl', function($scope, tabletopData) {

  randomColors();

  $scope.data = tabletopData;
  $scope.tracks = $scope.data[0].J4F.elements;

  // console.log('data: ', $scope.data[0].Tracks.elements);

  // instantiate tracks var - we'll fill this in a sec
  // $scope.tracks = [
  //   {
  //     'name': 'Ornery Little Darlings: Blueberry Hill (Dave Ruin Remix)',
  //     'url': 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/45982501&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true',
  //     'width': '100%',
  //     'height': '300'
  //   },
  //   {
  //     'name': 'The Purist Ft Mick Jenkins - Touch Me',
  //     'url': 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/189092844&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true',
  //     'width': '100%',
  //     'height': '300'
  //   }
  // ];

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