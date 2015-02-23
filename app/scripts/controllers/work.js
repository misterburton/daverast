'use strict';

/**
 * @ngdoc function
 * @name daverastApp.controller:WorkCtrl
 * @description
 * # WorkCtrl
 * Controller of the daverastApp
 */
 app.controller('WorkCtrl', function($scope, tabletopData) {

   $scope.data = tabletopData;
   $scope.tracks = $scope.data[0].Work.elements;

   // store path to website copy
   var copy = $scope.data[0].WebsiteCopy.elements[0];
   // set copy vars for the view
   $scope.homeHeadline = copy.workHeadline;
   $scope.homeCopy = copy.workCopy;

   // when leaving this view …
   $scope.$on('$locationChangeStart', function(event) {
     // do stuff on transition out
   });

   // fire random colors & init header funcitons from app.js
   randomColors();
   initHeader(copy);

 });

 // dynamically set iframe 'src' attributes when .track elements are added w/ a delay
 app.directive('workTracks', ['$timeout', function(timer) {
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

 // JSON format from google spreadsheet — $scope.data[0].Tracks.elements — for reference
 // $scope.tracks = [
 //   {
 //     'name': 'Ornery Little Darlings: Blueberry Hill (Dave Ruin Remix)',
 //     'url': 'https://w.soundcloud.com/player…
 //     'width': '100%',
 //     'height': '300'
 //   }
 // ];