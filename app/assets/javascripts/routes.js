// Generated by CoffeeScript 1.4.0
(function() {
  var angular, root, thisApp;

  root = typeof global !== "undefined" && global !== null ? global : window;

  angular = root.angular;

  thisApp = angular.module("AwesomeMovieReviewsClient", ['ngCookies', 'ngRoute', 'ngResource', 'ui.bootstrap', 'ui.bootstrap.tpls', 'templates']).config([
    '$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
      $locationProvider.html5Mode(true);
      $httpProvider.defaults.headers.post['Accept'] = 'application/json';

      $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

      $httpProvider.defaults.headers.get = {}

      $httpProvider.defaults.headers.get['Accept'] = 'application/json';

      $httpProvider.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';
      return $routeProvider.when("/", {
        controller: "WelcomeCtrl",
        templateUrl: "<%= asset_path('welcome/index.html') %>"
      }).
    when('/reviews', {controller:ReviewsIndexCtrl,
      templateUrl:'reviews/index.html'}).
    when('/search', {controller:"search",
      templateUrl:'movieSearch/movie.html'}).
      otherwise({
        redirectTo: "/reviews"
      });
    }

  ]);

  root.thisApp = thisApp;
  thisApp.factory("Review", ['$resource', function($resource) {
    var Review;
    Review = $resource("/reviews/:id",
        { id: "@id" },
        {
          update: { method: "PUT" },
          destroy: { method: "DELETE" }
        });

    Review.prototype.destroy = function(cb) {
      return Review.remove({
        id: this.id
      }, cb);
    };

    return Review;
  }
  ]);
}).call(this);