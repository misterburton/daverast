'use strict';

/**
 * @ngdoc overview
 * @name daverastApp
 * @description
 * # daverastApp
 *
 * Main module of the application.
 */
var app = angular.module('daverastApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ng-fastclick',
  'snap'
]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .when('/newPage', {
      templateUrl: 'views/newpage.html',
      controller: 'NewpageCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

/*
 **
 * globally available filter for trusted urls
 * usage: ng-src="{{ track.url | trustUrl }}"
 *
 */
app.filter('trustUrl', function($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
});

/*
preload all templates defined in module routes
http://stackoverflow.com/a/21601939
*/
app.run(function($templateCache, $route, $http) {
  var url;
  for (var i in $route.routes) {
    if (url = $route.routes[i].templateUrl) {
      $http.get(url, {
        cache: $templateCache
      });
    }
  }
});

// https://docs.angularjs.org/api/ngAnimate
app.animation('.page', function() {
  return {
    enter: function(element, done) {
      //run the animation here and call done when the animation is complete
      TweenMax.to(element, 0, {
        autoAlpha: 0,
        y: 20,
        overwrite: false
      });
      TweenMax.to(element, 0.5, {
        autoAlpha: 1,
        y: 0,
        delay: .25,
        overwrite: false
      });

      return function(cancelled) {
        //this (optional) function will be called when the animation
        //completes or when the animation is cancelled (the cancelled
        //flag will be set to true if cancelled).
      };
    },
    leave: function(element, done) {
      TweenMax.to(element, 0.75, {
        autoAlpha: 0,
        x: 0,
        y: 20,
        overwrite: false,
        display: 'none'
      });
    },
    move: function(element, done) {},
    //animation that can be triggered before the class is added
    beforeAddClass: function(element, className, done) {},

    //animation that can be triggered after the class is added
    addClass: function(element, className, done) {},

    //animation that can be triggered before the class is removed
    beforeRemoveClass: function(element, className, done) {},

    //animation that can be triggered after the class is removed
    removeClass: function(element, className, done) {}
  };
});

/*
////////////////////////////////////////////////
//// OMG RANDOM COLORS! ////////////////////////
////////////////////////////////////////////////
*/

function randomColors() {
  var randomRange = function(min,max) { return Math.floor(Math.random() * (max-min) + min); }
  var colorSteps = 3;
  var textColor, bgColor;
  var i = randomRange(0,2);
  // make sure it's a readable combo
  while ($.xcolor.distance(textColor, bgColor) < 270) {
    bgColor = $.xcolor.random();
    textColor = (i % 2 == 0) ? $.xcolor.darken(bgColor, colorSteps) : $.xcolor.lighten(bgColor, colorSteps);
  }

  var darkerText = $.xcolor.darken(bgColor, 4);

  // header
  $("#titleContainer h2").css('color', textColor);
  $("#titleContainer h4").css('color', textColor);
  $("header").css('background-color', bgColor);
  // hamburger menu
  $("#toggleSnapButton").css('background-color', bgColor);
  $("#toggleSnapButton").css('color', textColor);
  // desktop nav
  $("#desktopNavContainer li a").css('color', bgColor);
  $("#desktopNavContainer li a:hover").css('color', darkerText);
  $("#desktopNavContainer li a:active").css('color', darkerText);
  $("#desktopNavContainer li a:visited").css('color', darkerText);
  $("#desktopNav").css('background-color', textColor);
  // flyout menu
  $("#flyoutMenu li a").css('color', bgColor);
  $("#flyoutMenu li a:hover").css('color', darkerText);
  $("#flyoutMenu li a:active").css('color', darkerText);
  $("#flyoutMenu li a:visited").css('color', darkerText);
  $("#flyoutMenu").css('background-color', textColor);

  $(".navLink").mouseover(function() {
    $(this).css("color", darkerText)
  });

  $(".navLink").mouseout(function() {
    $(this).css("color", bgColor)
  });

  $(".navLink").click(function() {
    $(this).css("color", darkerText)
  });
}

/*
///////////////////////////////////////////
//// UTILITY STUFF ////////////////////////
///////////////////////////////////////////
*/

// open new pages in home screen web app on iOS, not in mobile safari
(function(a, b, c) {
  if (c in b && b[c]) {
    var d, e = a.location,
      f = /^(a|html)$/i;
    a.addEventListener("click", function(a) {
      d = a.target;
      while (!f.test(d.nodeName)) d = d.parentNode;
      "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
    }, !1)
  }
})(document, window.navigator, "standalone")

// allow CSS :active styles to fire on touch events
document.addEventListener("touchstart", function() {}, true);