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

  $scope.widgets = [];

  // grab copy vars for dynamic header text
  var copy = $scope.data[0].WebsiteCopy.elements[0];
  initHeader(copy);

  randomColors();

  // stop all playing soundcloud tracks when leaving this view …
  $scope.$on('$locationChangeStart', function(event) {
    $scope.stopAllTracks();
  });

  $scope.stopAllTracks = function() {
    for (var i = 0; i < $scope.widgets.length; i++) {
      var widget = $scope.widgets[i];
      widget.pause();
    }
  }

});

// dynamically set iframe 'src' attributes when .track elements are added w/ a delay
app.directive('featuredTrack', ['$timeout', function(timer) {
  return {
    link: function($scope, $elem, $attrs, $index) {

      var trackIFrame;
      var trackIFrameID = 'ID' + $index;
      var widget;

      var setIFrameSource = function() {
        // make iframe element invisible
        trackIFrame = $elem.find('.frame');

        // fire fade in callback when iframe is loaded
        trackIFrame.ready(function() {
          trackIFrame.css('opacity', 0);
          TweenMax.to(trackIFrame, .25, {
            autoAlpha: 1
          });
        });
        
        trackIFrame.attr('src', $scope.homeVars.url);
        trackIFrame.attr('id', trackIFrameID);

      } // setIFrameSource()

      /*
      **
       * wait for page transition before setting iframe `src` attributes
       * this works even with a delay of 0s / i.e. after $elem is added to DOM
       *
       */
      timer(setIFrameSource, 666);

      // after iframe src vars are set, push soundcloud widget vars to $scope.widgets array
      TweenMax.delayedCall(.7, storeSCWidgetVars);

      // unnecessary fun w/ the soundcloud widget API
      // https://developers.soundcloud.com/docs/api/html5-widget
      function storeSCWidgetVars() {
        widget = SC.Widget(trackIFrameID);
        $scope.widgets.push(widget);
      }

    } // link
  } // return
}]); // featured track directive