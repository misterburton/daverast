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
  'snap',
  'angular-loading-bar',
  'Tabletop',
  'ui.router'
]);

app.config(function($routeProvider, TabletopProvider) {
  // tabletop setup...
  TabletopProvider.setTabletopOptions({
    key: '1FLnqeYC351WaYsWWxEL59aPSUXyd3VR_Q_URMLg5Jgk',
  });

  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      resolve: {
        tabletopData: 'Tabletop'
      }
    })
    .when('/work', {
      templateUrl: 'views/work.html',
      controller: 'WorkCtrl',
      resolve: {
        tabletopData: 'Tabletop'
      }
    })
    .when('/play', {
      templateUrl: 'views/play.html',
      controller: 'PlayCtrl',
      resolve: {
        tabletopData: 'Tabletop'
      }
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

// load bar
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = true;
}]);

// listen for load bar 'loaded' event & fade in site
app.run(function($rootScope) {
  $rootScope.$on(
    "cfpLoadingBar:loaded",
    function fadeInPage() {
      TweenMax.to($('body'), .5, {
        autoAlpha: 1
      });
    }
  );
});

/*
**
 * preload all templates defined in module routes
 * http://stackoverflow.com/a/21601939
 *
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

/*
 **
 * globally page transition animations
 * https://docs.angularjs.org/api/ngAnimate
 *
 * for more fine-tuned, per-view animation on leave, use:
 * $scope.$on('$locationChangeStart'…
 *
 */
app.animation('.page', function() {
  return {
    enter: function(element, done) {
      // set page 20 px south in alpha 0
      TweenMax.to(element, 0, {
        autoAlpha: 0,
        y: 20,
        overwrite: false
      });
      // fade in & bring to y:0
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
**
 * dynamic text in header, called from views
 *
 */
function initHeader(copy) {
  // set & fade in titles & nav on first run
  var st = $('#siteTitle');
  var sst = $('#siteSubtitle')
  st.text(copy.siteTitle);
  sst.text(copy.siteSubtitle);
  TweenMax.to(st, .5, {opacity:1});
  TweenMax.to(sst, .5, {opacity:1});
  TweenMax.to($('#desktopNavList'), .5, {opacity:1});
}

/*
**
 * fix spotify's broke-arse embed code
 *
 */
function spotifyWidthFix(){
  $('iframe[src*="embed.spotify.com"]').each(function() {
    $(this).css('width',$(this).parent(1).css('width'));
    $(this).attr('src',$(this).attr('src'));
  });
}

$(window).resize(function() {
  spotifyWidthFix();
});

spotifyWidthFix();

/*
////////////////////////////////////////////////
//// OMG RANDOM COLOR FUNCTIONS ////////////////
////////////////////////////////////////////////
*/

function randomColors() {
  // shouts to my colleague, @simonking — i borrowed a few of these lines from the lovely smallflock.com
  var randomRange = function(min,max) { return Math.floor(Math.random() * (max-min) + min); }
  var colorSteps = 3;
  var textColor, bgColor;
  var i = randomRange(0,2);
  // make sure it's a readable combo
  while ($.xcolor.distance(textColor, bgColor) < 270) {
    bgColor = $.xcolor.random();
    textColor = (i % 2 == 0) ? $.xcolor.darken(bgColor, colorSteps) : $.xcolor.lighten(bgColor, colorSteps);
  }

  // make sure bgColor is always the darker of the two
  var bgLum = rgbGetLum(hexToRgb(bgColor).r, hexToRgb(bgColor).g, hexToRgb(bgColor).b);
  var textLum = rgbGetLum(hexToRgb(textColor).r, hexToRgb(textColor).g, hexToRgb(textColor).b);
  var tempTextColor; // temp var to store current text color
  if (bgLum > textLum) {
    tempTextColor = textColor;
    textColor = bgColor;
    bgColor = tempTextColor;
  }

  // kick up contrast between light & dark
  textColor = $.xcolor.lighten(textColor, 2);

  // rollover color
  var darkerText = $.xcolor.darken(bgColor, 1);

  // header
  $("#titleContainer h2").css('color', textColor);
  $("#titleContainer h4").css('color', textColor);
  $("header").css('background-color', bgColor);
  // hamburger menu
  $("#toggleSnapButton").css('background-color', bgColor);
  $("#toggleSnapButton").css('color', textColor);
  // desktop nav
  $("#desktopNavContainer li a").css('color', bgColor);
  $("#desktopNav").css('background-color', textColor);
  // flyout menu
  $("#flyoutMenu li a").css('color', bgColor);
  $("#flyoutMenu li a:hover").css('color', darkerText);
  $("#flyoutMenu li a:active").css('color', darkerText);
  $("#flyoutMenu li a:visited").css('color', darkerText);
  $("#flyoutMenu").css('background-color', textColor);
  // global page links
  $("a").css('color', bgColor);

  $(".navLink, a").mouseover(function() {
    $(this).css("color", darkerText)
  });

  $(".navLink, a").mouseout(function() {
    $(this).css("color", bgColor)
  });

  $(".navLink, a").click(function() {
    $(this).css("color", darkerText)
  });
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbGetLum(r, g, b){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return l;
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