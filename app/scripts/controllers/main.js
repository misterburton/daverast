'use strict';

/**
 * @ngdoc function
 * @name daverastApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the daverastApp
 */
app.controller('MainCtrl', function($scope) {

  // fire random colors funciton from app.js
  randomColors();
  
  // instantiate tracks var - we'll fill this in a sec
  $scope.tracks = [
    {
      'name': 'Ornery Little Darlings: Blueberry Hill (Dave Ruin Remix)',
      'url': 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/45982501&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true',
      'width': '100%',
      'height': '300'
    },
    {
      'name': 'The Purist Ft Mick Jenkins - Touch Me',
      'url': 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/189092844&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true',
      'width': '100%',
      'height': '300'
    }
  ];

  TweenMax.delayedCall(.5, fillUrlValues);

  function fillUrlValues() {
    // $scope.tracks[0].url = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/45982501&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true';
    // $scope.tracks = $scope.tracks;

    // $('.frame').attr('src', 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/45982501&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true')
  }

  // $('#trackList').css('display', 'none');

});

// dynamically set iframe 'src' attributes when .track elemtns are added w/ a 1s delay
app.directive('trackElement', ['$timeout', function(timer) {
  return {
    link: function($scope, $elem, $attrs, $index) {
      var setIFrameSource = function() {
        var frame = $elem.find('.frame');
        frame.attr('src', $scope.tracks[$attrs.id].url);
      }
      timer(setIFrameSource, 666); // this works even with a delay of 0s / i.e. when added to DOM
    }
  }
}]);
